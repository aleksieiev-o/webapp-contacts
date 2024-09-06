# Quit this script, if any non-zero exit code is returned
set -e

echo Parsing deploy arguments...

# https://unix.stackexchange.com/a/353639
for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   export "$KEY"="$VALUE"
done

# Move into Stage folder
cd ~/tsa/education/2024/webapp-contacts/stage

if [ -f "docker-compose.yaml" ]; then
    # First shutdown old docker compose stack
    echo Stopping docker stack...
    sudo docker compose down

    # renew the docker-compose file to current
    echo Deleteing docker-compose.yaml...
    rm -f docker-compose.yaml
fi

echo Creating docker-compose.yaml...
cat << EOF > docker-compose.yaml
networks:
  tsa_oa:

services:
  database:
    image: crtpdev.azurecr.io/mariadb:10.11.6-debian-11-r6
    restart: unless-stopped
    env_file:
      - path: .env.production
        required: true
    expose:
      - 3306
    ports:
      - '3307:3306'
    networks:
      - tsa_oa
    volumes:
      - ./docker_volume/database:/var/lib/mysql:rw

  backend:
    image: crtpdev.azurecr.io/tsa/education/2024/contacts-backend:stage-latest
    restart: unless-stopped
    env_file:
      - path: .env.production
        required: true
    depends_on:
      - database
    volumes:
      - /node_modules
      - ./docker_volume/backend:/backend
    ports:
      - '4000:4000'
    networks:
      - tsa_oa

  frontend:
    image: crtpdev.azurecr.io/tsa/education/2024/contacts-frontend:stage-latest
    restart: unless-stopped
    env_file:
      - path: frontend/.env.production
        required: true
    depends_on:
      - backend
    volumes:
      - /frontend/node_modules
      - ./docker_volume/frontend:/usr/src/app
    ports:
      - '80:80'
    networks:
      - tsa_oa
EOF

# finally start the stack back up again,
# quiet pull to not spam console with thousands of lines with Pulling image
sudo docker login crtpdev.azurecr.io -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD

echo "Pulling new Docker Images"
sudo docker compose pull --quiet
echo "Starting Docker Stage"
sudo docker compose up --quiet-pull -d
sudo docker logout crtpdev.azurecr.io
