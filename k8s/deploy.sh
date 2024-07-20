#!/bin/bash

K8S_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
kubectl create namespace lanchonete
kubectl apply -f "$K8S_DIR/configmap.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/secret.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/mongodb-deployment.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/mongodb-service.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/deployment.yaml" -n lanchonete
kubectl apply -f "$K8S_DIR/service.yaml" -n lanchonete
