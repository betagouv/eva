# Competence pro

Évaluer en ligne les compétences pro à travers des mises en situation

https://beta.gouv.fr/startup/eva.html

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Pour voir les autres projets de Compétences Pro:

- [la partie serveur](https://github.com/betagouv/eva-serveur)
- [la partie orchestration](https://github.com/betagouv/eva-orchestrateur)
- [le site web](https://github.com/betagouv/eva-www)

## Démarrer un serveur Webpack en local (mode développement)

Installer `npm` si nécessaire, et exécuter la commande suivante.

```
$ npm install && npm run dev
```

Et se rendre sur l'adresse affichée dans la sortie standard (http://localhost:7700 par défaut)

## Démarrer l'application avec docker (mode production)

Installer `docker` si nécessaire, et exécuter la commande suivante.

```
$ docker build -t competences-pro . && docker run --rm -ti -p 3000:80 competences-pro
```

Une fois le message `Successfully tagged competences-pro:latest` affiché, se rendre à l'adresse http://localhost:3000

## Travailler avec le linter

Quand on lance les tests, le linter `semistandard` est executé automatiquement avant de démarrer les tests en mode "watch".

Pour demander au linter de tenter de corriger les problèmes lancer :

```
$ npm run lint -- --fix
```

Certaines dépendences sont définies globalement dans webpack (ex. jQuery, mocha, etc.) et, à moins qu'elles soient déclarées comme « à ignorer », génèreront une erreur au niveau du linter. Pour déclarer au linter une dépendance globale à ignorer, l'ajouter dans le hash de configuration défini dans `package.json` :

```
"semistandard": {
     "globals": [
       "jQuery",
       // etc.
     ]
   }
```

Il est également possible de demander au linter d'accepter les dépendances définies globalement en les déclarant en commentaire au début du fichier source :

```
/* global jQuery, etc. */

// début du code source
```

Tous les commits doivent passer le linter. À ce titre, nous recommandons
d'ajouter la ligne suivante à la fin du script `.git/hooks/pre-commit`, à condition que votre script ne contienne pas déjà une commande `exec` :

```
exec /usr/local/bin/npm run lint -- --silent
```

Si vous êtes partis du template `.git/hooks/pre-commit.sample` vous pouvez simplement remplacer la ligne `exec git diff-index --check --cached $against --` car le linter fera le travail de vérification des espaces.

## Suivre le développement

Pour suivre les développements en cours, vous pouvez suivre le [projet github](https://github.com/orgs/betagouv/projects/2).

## Licence

Ce logiciel et son code source sont distribués sous [licence AGPL](https://www.gnu.org/licenses/why-affero-gpl.fr.html).
