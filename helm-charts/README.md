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

Deployment with value-dev file
`helm upgrade --install helm-charts ./helm-charts/ -f ./helm-charts/values.yaml -f ./helm-charts/values.local.yaml`

Deployment-upgrade with value-dev file
`helm upgrade helm-charts ./helm-charts/ -f ./helm-charts/values.yaml -f ./helm-charts/values.local.yaml`

Full value.yaml file with debug information
`helm template helm-charts ./helm-charts/ -f ./helm-charts/values.yaml -f ./helm-charts/values.local.yaml --debug > ./helm-charts/values.debug.yaml`
