English:
This form is a test of a PWA (Progressive Web Application). These are applications that can work offline. 
The form is used to fill in a DB in a table on Wamp when the user is online.
When the user is offline and submits the form, the data is stored on IndexedDB. 
But as soon as the user logs on again, the data is immediately synchronized with the DB. 
You can install this application on your desktop and run it as a native application. 
But the only drawback for the moment is that you need to be in the root directory (www.) of phpmyadmin because of the php used to communicate with the DB.

HOW TO USE?
1- install wampserver if you don't already have it
2- create the database (testpwa) with a table (user) in phpmyadmin
3- unzip the project and put it in the phpmyadmin root directory (www)
4- in the user.php file, enter your login and password to access your database. On line 9: $conn = mysqli_connect('localhost', 'root', '', 'testpwa');
5- launch index.html from your browser 
6- view the page, then use network to toggle between online and offline modes

Français:
Ce formulaire est un test de realisation d'une PWA (Progressive Web Application). Ce sont les applications pouvant fonctionner hors connexion.
Le formulaire permet de remplir une BD a une table sur Wamp lorsque l'utilisateur est en ligne.
Lorsque l'utilisateur est hors ligne et qu'il soumet le formulaire, les donnees sont stockees sur IndexedDB. 
Mais des que celui-ci se connecte a nouveau, les donnees sont immediatement synchronisees avec la BD.
Il est possible d'installer cette d'application sur ton desktop et de l'executer comme une application native.
Mais le seul bemol pour l'instant c'est qu'il faut etre dans le repertoire racine (www.) de phpmyadmin a cause du php utilise
pour communiquer avec la BD.

comment utiliser?
1- installer wampserver si vous ne l'avez pas deja
2- creer la base de donnees (testpwa) avec une table (user) dans phpmyadmin
3- dezipper le projet et le mettre dans le repertoire racine de phpmyadmin(www)
4- dans le fichier user.php mettre vos identifiants de connexion pour avoir acces a votre base de donnees. C'est a la ligne 9: $conn = mysqli_connect('localhost', 'root', '', 'testpwa');
5- lancer le fichier index.html a partir de votre browser 
6- inpecter la page, puis utliser network pour basculer entre le mode online et offline