# Assignment-08 — Minikube + Traefik + ArgoCD + DNS local (IaC)

## 1. Objetivo de la actividad

El propósito de esta actividad es crear un clúster local de Kubernetes utilizando **Minikube** e instalar en él **Traefik** como Ingress Controller para rutas y servicios, y **ArgoCD** para la gestión y monitoreo del estado de aplicaciones.

Adicionalmente, se despliega una aplicación web estática dockerizada y se expone mediante un **IngressRoute** de Traefik utilizando **DNS local**, considerando que el clúster no depende de internet para la resolución DNS.

---

## 2. Arquitectura general

La arquitectura utilizada en esta actividad está compuesta por los siguientes elementos:

- **Minikube**: clúster local de Kubernetes.
- **Traefik**: enruta tráfico HTTP hacia los servicios internos mediante CRDs, específicamente usando `IngressRoute`.
- **ArgoCD**: panel web para visualizar aplicaciones y su estado dentro del clúster.
- **Mini App HTML con Nginx**: aplicación web estática dockerizada y desplegada en Kubernetes mediante `Deployment` y `Service`.

---

## 3. Dominios configurados con DNS local

Se configuraron dominios locales para simular un entorno realista sin depender de DNS público:

| Servicio | Dominio |
|---|---|
| ArgoCD | `argo.wesley-cardona.com` |
| Aplicación web | `app.wesley-cardona.com` |

> Nota: Estos dominios se resuelven localmente mediante el archivo `/etc/hosts`.

---

## 4. URLs de acceso

Los servicios desplegados se acceden mediante las siguientes URLs:

- **ArgoCD**: [http://argo.wesley-cardona.com](http://argo.wesley-cardona.com)
- **Aplicación web**: [http://app.wesley-cardona.com](http://app.wesley-cardona.com)

> Nota de compatibilidad: algunos navegadores, como Brave, pueden forzar HTTPS mediante “HTTPS-First” y causar fallos al acceder por HTTP. Durante las pruebas, **Firefox** funcionó correctamente usando HTTP.

---

## 5. Evidencias requeridas

Las capturas deben colocarse dentro del repositorio, por ejemplo en la siguiente ubicación:

```text
assignment-08/screenshots/
```

Capturas requeridas:

```text
assignment-08/screenshots/app.png
```

Captura de la aplicación funcionando con el dominio configurado.

```text
assignment-08/screenshots/argocd.png
```

Captura de ArgoCD funcionando con el dominio:

```text
argo.wesley-cardona.com
```

Este dominio también se encuentra definido en el manifiesto:

```text
assignment-08/k8s/20-argocd/argocd-ingressroute.yaml
```

---

## 6. Manifiestos utilizados como IaC

Todos los componentes se instalan mediante manifiestos YAML, sin intervención manual, ubicados en las siguientes rutas:

```text
assignment-08/k8s/00-base/namespaces.yaml
assignment-08/k8s/10-traefik/traefik-crds.yaml
assignment-08/k8s/10-traefik/traefik.yaml
assignment-08/k8s/10-traefik/03-traefik-clusterrolebinding.yaml
assignment-08/k8s/20-argocd/argocd-install.yaml
assignment-08/k8s/20-argocd/argocd-ingressroute.yaml
assignment-08/k8s/20-argocd/02-argocd-server-insecure.yaml
assignment-08/k8s/30-app/app.yaml
```

---

## 7. Comandos ejecutados

### 7.1 Verificación de requisitos

Se verificó que las herramientas necesarias estuvieran instaladas:

```bash
docker --version
kubectl version --client
minikube version
```

---

### 7.2 Crear e iniciar el clúster con Minikube

Se inició el clúster local utilizando Docker como driver:

```bash
minikube start --driver=docker
```

Luego se verificó el estado del clúster:

```bash
minikube status
kubectl get nodes -o wide
```

---

### 7.3 Aplicar namespaces

Se aplicaron los namespaces base del proyecto:

```bash
kubectl apply -f assignment-08/k8s/00-base/namespaces.yaml
```

---

### 7.4 Instalar Traefik

Primero se aplicaron los CRDs de Traefik:

```bash
kubectl apply -f assignment-08/k8s/10-traefik/traefik-crds.yaml
```

Luego se instaló el controlador de Traefik:

```bash
kubectl apply -f assignment-08/k8s/10-traefik/traefik.yaml
```

Se verificaron los pods y servicios de Traefik:

```bash
kubectl -n traefik get pods
kubectl -n traefik get svc
```

#### Fix RBAC para Traefik

Para evitar errores 404 causados por falta de permisos, se aplicó el manifiesto de `ClusterRoleBinding`:

```bash
kubectl apply -f assignment-08/k8s/10-traefik/03-traefik-clusterrolebinding.yaml
```

Después se reinició el deployment de Traefik:

```bash
kubectl -n traefik rollout restart deploy/traefik
kubectl -n traefik rollout status deploy/traefik
```

---

### 7.5 Instalar ArgoCD

En algunos casos, `kubectl apply` puede fallar por el tamaño de anotaciones en los CRDs. Por eso se aplicó ArgoCD utilizando `server-side apply`:

```bash
kubectl apply --server-side -f assignment-08/k8s/20-argocd/argocd-install.yaml
```

Se verificó que los pods de ArgoCD estuvieran ejecutándose:

```bash
kubectl -n argocd get pods
```

---

### 7.6 Exponer ArgoCD mediante Traefik

Se aplicó el `IngressRoute` de ArgoCD con el dominio requerido:

```bash
kubectl apply -f assignment-08/k8s/20-argocd/argocd-ingressroute.yaml
```

Se verificó el recurso `IngressRoute`:

```bash
kubectl -n argocd get ingressroute
```

---

### 7.7 Configurar ArgoCD para HTTP

Para evitar la redirección automática a HTTPS, se configuró ArgoCD en modo inseguro:

```bash
kubectl apply -f assignment-08/k8s/20-argocd/02-argocd-server-insecure.yaml
```

Luego se reinició el servidor de ArgoCD:

```bash
kubectl -n argocd rollout restart deployment/argocd-server
kubectl -n argocd rollout status deployment/argocd-server
```

---

### 7.8 Construir la imagen local de la aplicación

Se construyó la imagen Docker de la mini aplicación:

```bash
docker build -t assignment-08-miniapp:local ./assignment-08/app
```

Luego se cargó la imagen dentro de Minikube:

```bash
minikube image load assignment-08-miniapp:local
```

---

### 7.9 Desplegar la aplicación

Se desplegó la aplicación en Kubernetes:

```bash
kubectl apply -f assignment-08/k8s/30-app/app.yaml
```

Se verificaron los pods, servicios e `IngressRoute` de la aplicación:

```bash
kubectl -n app get pods,svc,ingressroute
```

---

### 7.10 Configurar DNS local

Primero se obtuvo la IP del clúster de Minikube:

```bash
minikube ip
```

Luego se editó el archivo `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Se agregaron los dominios locales apuntando a la IP de Minikube:

```text
<MINIKUBE_IP>  app.wesley-cardona.com  argo.wesley-cardona.com
```

Ejemplo:

```text
192.168.49.2  app.wesley-cardona.com  argo.wesley-cardona.com
```

Finalmente, se verificó la resolución local de los dominios:

```bash
getent hosts app.wesley-cardona.com
getent hosts argo.wesley-cardona.com
```

---

## 8. Resultado esperado

Al finalizar la configuración, los servicios deben estar disponibles desde el navegador mediante HTTP:

```text
http://app.wesley-cardona.com
http://argo.wesley-cardona.com
```

La aplicación web debe mostrarse correctamente utilizando el dominio configurado, y ArgoCD debe estar accesible desde su dominio local mediante Traefik.

---

## 9. Conclusión

En esta actividad se implementó un entorno local de Kubernetes utilizando Minikube. Se instaló Traefik como Ingress Controller y ArgoCD como herramienta de monitoreo y gestión de aplicaciones.

Además, se desplegó una aplicación web estática dockerizada y se expuso mediante un `IngressRoute` utilizando DNS local. Esto permitió simular un entorno más cercano a producción, aplicando principios de infraestructura como código mediante manifiestos YAML.
