# Quit this script, if any non-zero exit code is returned
set -e

echo Parsing pre-deploy arguments...

# https://unix.stackexchange.com/a/353639
for ARGUMENT in "$@"
do
   KEY=$(echo $ARGUMENT | cut -f1 -d=)

   KEY_LENGTH=${#KEY}
   VALUE="${ARGUMENT:$KEY_LENGTH+1}"

   export "$KEY"="$VALUE"
done

# Create stage and frontend folders
echo Creating folders...
mkdir -p ~/tsa/education/2024/webapp-contacts/stage/frontend

# Move into Stage folder
cd ~/tsa/education/2024/webapp-contacts/stage

echo Creating .env file ...
cat << EOF > .env.production
DOCKER_REGISTRY_URL=$DOCKER_REGISTRY_URL
DOCKER_REGISTRY_AUTH=$DOCKER_REGISTRY_AUTH
HOST=0.0.0.0
PORT=4000
DB_HOST=database
DB_PORT=3306
DB_USER_NAME=root
DB_USER_PASSWORD=root
DB_NAME=contactsdatabase
MARIADB_ROOT_PASSWORD=root
MARIADB_DATABASE=contactsdatabase
EOF

# Move into frontend folder
cd ~/tsa/education/2024/webapp-contacts/stage/frontend

echo Creating .env file for frontend ...
cat << EOF > .env.production
VITE_API_URL=http://49.12.194.89:4000
EOF
