# microservicesMovies

## Architecture

Nous avons développé 4 composants: crypto, movie, user-component, et mainInterface.

Les requêtes doivent toutes se faire via le composant mainInterface, qui se charge de les répartir sur les autres composants.

## Installation locale

L'API fonctionne lorsqu'elle est installée localement. Pour ce faire, cloner ce dépôt, puis suivre les instructions d'installation de chaque composant.

Ensuite, les lancer les 4 en même temps.

Un programme se connectant à l'API et effectuant des opérations de base permet de tester son fonctionnement, et de comprendre comment faire des requêtes dessus. Il se trouve dans le répertoire test.

## Docker

Pour déployer les microservices, nous avons créé des Dockerfiles à l'aide de la slide d'exemple. Ils sont dans le répertoire racine de chacun des microservices.
Il faut alors ouvrir un terminal dans chacun des dossiers contenant les dockerfiles et taper:

`docker build -t <nom_conteneur> .`

Puis taper

`docker run <nom_conteneur>`

Nous n'avons pas réussi à faire communiquer les microservices entre eux.
