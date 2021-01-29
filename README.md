# microservicesMovies

## Docker

Pour déployer les microservices, nous avons créé des Dockerfiles à l'aide de la slide d'exemple. Ils sont dans le répertoire racine de chacun des microservices.
Il faut alors ouvrir un terminal dans chacun des dossiers contenant les dockerfiles et taper:

`docker build -t <nom_conteneur> .`

Puis taper

`docker run <nom_conteneur>`