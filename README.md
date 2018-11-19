# Competence pro

Évaluer en ligne les compétences pro à travers des mises en situation

https://beta.gouv.fr/startup/competences-pro.html

## Démarrer un serveur Webpack en local (mode développement)

Installer `npm` si nécessaire, et exécuter la commande suivante.

```
$ npm install && npm run dev
```

## Démarrer l'application en local (mode production)

Installer `npm` si nécessaire, et exécuter la commande suivante.

```
$ npm install && npm run build && npm start
```

## Déployer l'application sur une machine distante

_Note : la machine distante doit être équipée de…_
- _un démon SSH_
- _Docker_


Copier le fichier `bin/config.sh.sample` vers `bin/config.sh` (fichier non suivi par Git)
```
$ cp bin/config.sh.sample bin/config.sh
```

Éditer le fichier `bin/config.sh` pour renseigner
- l'adresse de la machine distante, éventuellement précédée du login (si le
  login n'est pas renseigné, les scripts de déploiement utiliseront le login de
  l'utilisateur qui lance le script de déploiement), et
- le répertoire cible dans lequel les fichiers nécessaires à l'installation de l'application seront copiés.
- le port d'écoute du serveur (le serveur écoute par défaut sur le port `80`)

Ensuite, lancer le déploiement.
```
$ bin/prod_deploy.sh
```
