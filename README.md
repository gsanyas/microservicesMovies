# microservicesMovies

Ce programme est essentiellement une démonstration d'une architecture microservices pour un travail scolaire.

Il s'agit du minimal viable product d'une API permettant de gérer un catalogue de films.

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

## Documentation

Toutes les requêtes doivent s'effectuer sur l'interface mainInterface.

L'authentification se fait via un token chiffré contenant les informations utilisateur, en particulier ses droits administratifs.

Ressources :

### User

Format des données utilisateurs : {id: number,address: string,password: string,rights: string}: User

rights peut prendre les valeurs suivantes :
- "1": autorisations client
- "2": autorisations service admin
- "3": autorisations catalogue admin

Endpoints:

requêtes de la forme `$interfaceURI + /user + $endpoint` (ex: `http://localhost:8000/user/login`)

- login
  - POST `/login`
  - body: {address: string,password: string} (all fields are mandatory)
  - response: status: 200, body: string (authentication token)
- add
  - POST `/add`
  - body: {user: {address: string,password: string,rights: string}} (all fields are mandatory)
  - headers: {token: string}
  - authorization needed: rights=2
  - response: status: 201, body: User
- archive
  - POST `/archive/:id`
  - body: {}
  - headers: {token: string}
  - authorization needed: rights=2
  - response: status: 204

### Movie

Format des données des films : {id: number,title: string,director: string,genre: string}: Movie

Endpoints:

requêtes de la forme `$interfaceURI + /movie + $endpoint` (ex: `http://localhost:8000/movie/find/:title`)

- login
  - GET `/find/:title`
  - response: status: 200, body: Movie
- add
  - POST `/add`
  - body: {user: {title: string,director: string,genre: string}} (all fields are mandatory)
  - headers: {token: string}
  - authorization needed: rights=3
  - response: status: 201, body: Movie
- archive
  - POST `/archive/:id`
  - body: {}
  - headers: {token: string}
  - authorization needed: rights=3
  - response: status: 204
