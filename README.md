Ce formulaire est un test de realisation d'une PWA (Progressive Web Application). Ce sont les applications pouvant fonctionner hors connexion.
Le formulaire permet de remplir une BD a une table sur Wamp lorsque l'utilisateur est en ligne.
Lorsque l'utilisateur est hors ligne et qu'il soumet le formulaire, les donnees sont stockees sur IndexedDB. 
Mais des que celui-ci se connecte a nouveau, les donnees sont immediatement synchronisees avec la BD.
Il est possible d'installer cette d'application sur ton desktop et de l'executer comme une application native.
Mais le seul bemol pour l'instant c'est qu'il faut etre dans le repertoire racine (www.) de phpmyadmin a cause du php utilise
pour communiquer avec la BD.
