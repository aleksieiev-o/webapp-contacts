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
mkdir -p ~/tsa/education/2024/webapp-contacts/stage-helm

# Move into Stage folder
cd ~/tsa/education/2024/webapp-contacts/stage-helm

if [ -f "values.yaml" ]; then
	rm -f values.yaml
fi

echo Creating values.yaml...
cat << EOF > values.yaml
imageCredentials:
	password: ${CI_REGISTRY_PASSWORD}

database:
  replicaCount: 1
  replication:
    enabled: false
  image:
    repository: crtpdev.azurecr.io/mariadb:10.11.6-debian-11-r6
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 3306
  env:
    NODE_ENV: production
    HOST: 0.0.0.0
    # PORT: "4000"
    DB_HOST: $RELEASE_NAME-database.default.svc.cluster.local
    # DB_PORT: "3306"
    MARIADB_USER: $MARIADB_USER
    MARIADB_PASSWORD: $MARIADB_PASSWORD
    MARIADB_DATABASE: $MARIADB_DATABASE
    MARIADB_ROOT_PASSWORD: $MARIADB_ROOT_PASSWORD
  volumeName: database-volume
  volumeMountPath: /var/lib/mysql
  storage: 128Mi

backend:
  replicaCount: 1
  image:
    repository: $IMAGE_NAME_BACKEND
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 4000
  env:
    NODE_ENV: production
    HOST: 0.0.0.0
    # PORT: "4000"
    DB_HOST: $RELEASE_NAME-database.default.svc.cluster.local
    # DB_PORT: "3306"
    MARIADB_USER: $MARIADB_USER
    MARIADB_PASSWORD: $MARIADB_PASSWORD
    MARIADB_DATABASE: $MARIADB_DATABASE
    MARIADB_ROOT_PASSWORD: $MARIADB_ROOT_PASSWORD

frontend:
  replicaCount: 1
  image:
    repository: $IMAGE_NAME_FRONTEND
    tag: latest
    pullPolicy: Always
  service:
    type: NodePort
    port: 8080
  env:
    NODE_ENV: production

ingress:
  enabled: true
  className: "nginx"
  annotations:
    kubernetes.io/ingress.class: nginx
  hosts:
    - host: $PROJECT_URL
      paths:
        - path: /
          pathType: Prefix
          backend:
              service:
                name: $RELEASE_NAME-frontend
                port:
                  number: 80

  tls: []
EOF

if [ $DEPLOY_MODE == 'delete' ]
then
	echo "Starting uninstall"
	helm uninstall $RELEASENAME
else
	echo "Starting upgrage"
	helm ${DEPLOY_MODE} --install $RELEASENAME ${CHARTNAME} -f ./values.yaml 
fi