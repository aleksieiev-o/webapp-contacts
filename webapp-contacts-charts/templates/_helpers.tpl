{{/*
Expand the name of the chart.
*/}}
{{- define "webapp-contacts-charts.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "webapp-contacts-charts.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "webapp-contacts-charts.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "webapp-contacts-charts.labels" -}}
helm.sh/chart: {{ include "webapp-contacts-charts.chart" . }}
{{ include "webapp-contacts-charts.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "webapp-contacts-charts.selectorLabels" -}}
app.kubernetes.io/name: {{ include "webapp-contacts-charts.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Pod-typed selector labels
*/}}
{{- define "webapp-contacts-charts.selectorLabelsDatabase" -}}
app.kubernetes.io/instance: {{ .Release.Name }}-database
{{- end }}
{{- define "webapp-contacts-charts.selectorLabelsBackend" -}}
app.kubernetes.io/instance: {{ .Release.Name }}-backend
{{- end }}
{{- define "webapp-contacts-charts.selectorLabelsFrontend" -}}
app.kubernetes.io/instance: {{ .Release.Name }}-frontend
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "webapp-contacts-charts.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "webapp-contacts-charts.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
