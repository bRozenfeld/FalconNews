# FalconNews
Display news related to cybersecurity field in the world 

## update
Pour que les nouvelles fonctionnalités fonctionnent vous devez:
* se rendre dans phpmyadmin, se connecter et aller dans la base de donnée falconnewsdb
* aller dans l'onglet "Importer"
* récupérer le fichier "falconnewsdb.sql" située dans le dossier "db"
* cliquer sur exécuter

# Travail à réaliser
## Mettre votre nom à côté de la tâche que vous effectuer

* Mettre à jour la page automatiquement après avoir ajouter / supprimer un élément --->HAITAM
* Réaliser une belle interface graphique -> HAITAM,Etienne
* Réaliser un contrôle sur un URL pour vérifier qu'il est bien valide avant de l'ajouter
* Mettre en place un système d'authentification -> Benjamin
* Mettre en place des fonctions qui vérifient qu'il n'y a pas plus de 15 URL ->Dimitri
* Afficher des news sur plusieurs écrans
* Lier les news avec les URL de feeder->Dimitri


## Installation
* Installer la dernière version de WAMP http://www.wampserver.com/
* Aller dans le dossier wamp\www et entrer la commande suivante:
* git clone https://github.com/bRozenfeld/FalconNews.git
*
* Pour vérifier l'installation, entrer dans la barre de votre navigateur
* http://localhost/FalconNews
* cliquer sur api/test.php et vous devriez voir apparaitre "Test" à l'écran
*
* POSTMAN : permet de réaliser des requêtes sur notre api
* https://www.getpostman.com/downloads/

## Structure projet
* api/ backend (php)
* gui/ frontend (javascript / html / css)
* db/ infos sur la base de données (diagramme UML, fichiers de configurations)

## Tutoriel 
* https://openclassrooms.com/fr/courses/918836-concevez-votre-site-web-avec-php-et-mysql
* https://www.codeofaninja.com/2017/02/create-simple-rest-api-in-php.html
* https://rogerdudler.github.io/git-guide/
* https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript

## ressources
* https://rss2json.com/docs -> Website to convert xml rss feed to json
* https://stackoverflow.com/questions/51647764/how-to-parse-an-rss-feed-using-javascript-external-domain -> explication to avoid the cors errors while making ajax request to other website



