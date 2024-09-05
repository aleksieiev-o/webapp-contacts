# Quit this script, if any non-zero exit code is returned
set -e

echo Parsing Arguments...

# https://unix.stackexchange.com/a/353639
for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   export "$KEY"="$VALUE"
done

# Create Cache and stage folder
echo Creating Folders...
mkdir -p ~/tsa/education/2024/webapp-contacts/stage/docs_cache

# Move into Stage folder
cd ~/tsa/education/2024/webapp-contacts/stage

# First shutdown old docker compose stack
echo Stopping docker stack...
sudo docker compose down

echo Creating .env file ...
cat << EOF > .deployment.env

DOCKER_REGISTRY_URL=$DOCKER_REGISTRY_URL
DOCKER_REGISTRY_AUTH=$DOCKER_REGISTRY_AUTH

EOF

# finally start the stack back up again,
# quiet pull to not spam console with thousands of lines with Pulling image
sudo docker login crtpdev.azurecr.io -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD

echo "Pulling new Docker Images"
sudo docker compose pull --quiet
echo "Starting Docker Stage"
sudo docker compose up --quiet-pull -d
sudo docker logout crtpdev.azurecr.io
