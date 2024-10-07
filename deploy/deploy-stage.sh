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

# Create stage folders
echo Creating folder...
mkdir -p ~/tsa/education/2024/webapp-contacts/stage

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
      - path: .env
        required: true
    expose:
      - 3306
    ports:
      - '127.0.0.1:3307:3306'
    networks:
      - tsa_oa
    volumes:
      - ./docker_volume/database:/var/lib/mysql:rw

  backend:
    image: crtpdev.azurecr.io/tsa/education/2024/contacts-backend
    restart: unless-stopped
    env_file:
      - path: .env
        required: true
    depends_on:
      - database
    volumes:
      - /node_modules
      - ./docker_volume/backend:/backend
    ports:
      - '127.0.0.1:4000:4000'
    networks:
      - tsa_oa

  frontend:
    image: crtpdev.azurecr.io/tsa/education/2024/contacts-frontend
    restart: unless-stopped
    depends_on:
      - backend
    volumes:
      - /frontend/node_modules
      - ./docker_volume/frontend:/usr/src/app
    ports:
      - '127.0.0.1:8080:80'
    networks:
      - tsa_oa
EOF

echo Creating .env file ...
cat << EOF > .env
DOCKER_REGISTRY_URL=$DOCKER_REGISTRY_URL
DOCKER_REGISTRY_AUTH=$DOCKER_REGISTRY_AUTH
HOST=0.0.0.0
PORT=4000
DB_HOST=database
DB_PORT=3306
MARIADB_USER=$DB_USER
MARIADB_PASSWORD=$DB_PASSWORD
MARIADB_DATABASE=$MARIADB_DATABASE
MARIADB_ROOT_PASSWORD=$DB_ROOTPASSWORD
EOF

# finally start the stack back up again,
# quiet pull to not spam console with thousands of lines with Pulling image
sudo docker login crtpdev.azurecr.io -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD

echo "Pulling new Docker Images"
sudo docker compose pull --quiet
echo "Starting Docker Stage"
sudo docker compose up --quiet-pull -d

sudo docker logout crtpdev.azurecr.io
