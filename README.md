# Clean Arch Lanchonete
Projeto de arquitetura limpa do curso de pós graduação da FIAP

# Como rodar o projeto?
## Docker compose
```bash docker compose up```

## K8s
- Instale o minikube
- Inicie o minibuke ```minikube start```
- Habilite as métricas ```minikube addons enable metrics-server```
- Execute ```./k8s/deploy.sh```
