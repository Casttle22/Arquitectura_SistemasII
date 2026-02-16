#Assignment 01 - Balanceador de carga Round Robin (Nginx + Docker Compose)

#Comando para ejecutar la infraestructura
docker compose up

#URL del balanceador
http://localhost:8080

## Diagrama de la infraestructura
```mermaid
flowchart TD
  A[Cliente / Navegador<br/>http://localhost:8080] --> B[Balanceador Nginx]
  B --> C[server1 nginx<br/>Hola mundo desde server 1]
  B --> D[server2 nginx<br/>Hola mundo desde server 2]

