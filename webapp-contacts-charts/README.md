## Helm charts description

##### Description of configuration parameters
YAML file `value.local.yaml` contains configuration settings for various components of a web application.

The settings are organized into sections, each representing a different component:
- `database` Configuration settings for the database component.
	- `replicaCount`: This indicates that there should be one replica of the database pod running.
	- `replication.enabled`: This setting specifies that replication is not enabled for the database.
	- `image.repository`, `image.tag`, `image.pullPolicy`: These settings define the Docker image for the database, its tag, and the pull policy for the image.
	- `service.type`, `service.port`, `service.containerPort`: These settings define the service type, port, and container port for the database service.
	- `persistentVolumeClaimRetentionPolicy.whenDeleted`, `persistentVolumeClaimRetentionPolicy.whenScaled`: These settings specify the retention policy for the persistent volume claim 	-sociated with the database.
	- `env`: This section contains various environment variables required for the database.
	- `volumeName`, `volumeMountPath`, `storage`: These settings define the persistent volume name, volume mount path, and storage capacity for the database.

-  `backend` Configuration settings for the backend component.
	- `replicaCount`: This indicates that there should be one replica of the backend pod running.
	- `image.repository`, `image.tag`, `image.pullPolicy`: These settings define the Docker image for the backend, its tag, and the pull policy for the image.
	- `service.type`, `service.port`, `service.containerPort`: These settings define the service type, port, and container port for the backend service.
	- `env`: This section contains various environment variables required for the backend.

-  `frontend` Configuration settings for the frontend component.
	- `replicaCount`: This indicates that there should be one replica of the frontend pod running.
	- `image.repository`, `image.tag`, `image.pullPolicy`: These settings define the Docker image for the frontend, its tag, and the pull policy for the image.
	- `service.type`, `service.port`, `service.containerPort`: These settings define the service type, port, and container port for the frontend service.
	- `env`: This section contains various environment variables required for the frontend.

-  `ingress` Configuration settings for the ingress controller. This configuration allows external traffic to reach the frontend and backend services of the application through the Nginx Ingress controller, with specific paths being routed to the respective services.
	- `enabled`: This line enables the Ingress resource.
	- `className`: This line specifies the Ingress controller class.
	- `annotations`: This section contains additional metadata for the Ingress resource.
	- `hosts`: This section defines the hostnames and paths that the Ingress resource should handle.
		- `- host`: This line specifies the hostname for the Ingress resource.
		- `paths`: This section defines the paths that should be handled by the Ingress resource.
			- `- path`: This line specifies the root path ("/") that should be handled by the frontend service.
	- `tls`: This section defines the TLS configuration for the Ingress resource.

- `autoscaling` Configuration settings for horizontal pod autoscaling.
	- `enabled`: This line indicates that autoscaling is currently disabled for this deployment.
	- `minReplicas`: This line sets the minimum number of replicas for the deployment.
	- `maxReplicas`: This line sets the maximum number of replicas for the deployment.
	- `targetCPUUtilizationPercentage`: This line sets the target CPU utilization percentage for the autoscaler. If the average CPU utilization across all pods exceeds this value, the autoscaler will scale up the number of replicas.
	- `targetMemoryUtilizationPercentage`: This line sets the target memory utilization percentage for the autoscaler. If the average memory utilization across all pods exceeds this value, the autoscaler will scale up the number of replicas.

---

##### Lokal deployment using Helm
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

Add Ingress-host to the `.hosts` file
`127.0.0.1 contacts-app-local`

To access the local deployed site using Minikube and their host-name `http://contacts-app-local`, you have to run `minikube tunnel` in the console

Upgrade using `value.local.yaml` file
`helm upgrade --install webapp-contacts-charts ./webapp-contacts-charts/ -f ./webapp-contacts-charts/values.local.yaml`

Uninstall
`helm uninstall webapp-contacts-charts`

Get local value-template with debug information and set it to file `./webapp-contacts-charts/tmp/values.debug.yaml`
`mkdir -p ./webapp-contacts-charts/tmp && helm template webapp-contacts-charts ./webapp-contacts-charts/ -f ./webapp-contacts-charts/values.local.yaml --debug > ./webapp-contacts-charts/tmp/values.debug.yaml`
