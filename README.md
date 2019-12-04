# FalconNews
Display news related to cybersecurity field in the world 

## Pré requis
* PHP version >= 7.0
* Base de données MySQL
* Server Apache

## Installation
* git clone https://github.com/bRozenfeld/FalconNews.git
* 
* Paramétrer la base de données:
* api/config/database.php -> mettez les informations que vous voulez dans les variables $host, $db_name, $username, $password
*
* Exécuter le script SQL: 
* db/falconnews.sql
* 
* Un admin est crée avec comme identifiant:
* email : admin@admin.com 
* password : Admin1234

## Utilisation
* A partir du lien suivant vous pouvez accéder à tout
* gui/app/news/news.html

## Structure projet
* api/ backend (php)
* gui/ frontend (javascript / html / css)
* db/ infos sur la base de données (diagramme UML, fichiers de configurations)

## Quelques flux rss
* https://cyware.com/allnews/feed
* https://feeds.feedburner.com/TheHackersNews?format=xml
* https://threatpost.com/feed/
*
* Suivant la taille du flux, la requête peut mettre entre 5s et 1min à s'exécuter.




