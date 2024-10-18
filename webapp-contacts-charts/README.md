###### Lokal deployment using Helm

Start the Minikube
`minikube start`

Check Helm version to make sure, that it works
`helm version`

Create images
`docker build -t backend-local .`
`docker build -t frontend-local ./frontend`

Switch to Docker-Daemon Minikube
`eval $(minikube docker-env)`

Create images once again
`docker build -t backend-local .`
`docker build -t frontend-local ./frontend`

Upgrade with `value.local.yaml` file
`helm upgrade --install webapp-contacts-charts ./webapp-contacts-charts/ -f ./webapp-contacts-charts/values.yaml -f ./webapp-contacts-charts/values.local.yaml`

Uninstall
`helm uninstall webapp-contacts-charts`

Get full `value.yaml` file with debug information to `./webapp-contacts-charts/tmp/values.debug.yaml`
`helm template webapp-contacts-charts ./webapp-contacts-charts/ -f ./webapp-contacts-charts/values.yaml -f ./webapp-contacts-charts/values.local.yaml --debug > ./webapp-contacts-charts/tmp/values.debug.yaml`
