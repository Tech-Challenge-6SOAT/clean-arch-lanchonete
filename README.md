# Clean Arch Lanchonete
Projeto de arquitetura limpa do curso de pós graduação da FIAP

# Como rodar o projeto?
## Docker compose
```bash docker compose up```

## K8s
- Instale o minikube
- Inicie o minibuke ```bash minikube start```
- Habilite as métricas ```bash minikube addons enable metrics-server```
- Execute ```bash ./k8s/deploy.sh```
