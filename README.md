# eva

Évaluer en ligne les compétences transversales à travers des mises en situations professionnelles.

https://beta.gouv.fr/startup/eva.html

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Pour voir les autres projets de eva :

- [la partie serveur](https://github.com/betagouv/eva-serveur)

Anciens dépôts que nous n'utilisons plus aujourd'hui :

- [la partie orchestration](https://github.com/betagouv/eva-orchestrateur)
- [le site web](https://github.com/betagouv/eva-www)

## Configuration de l'environnement

### Dépendences

* node.js (dont la version est spécifié dans le fichier `.tool-version`)

pour le développement :
* OptiPNG version 0.7.7 ou supérieur

Cette utilitaire doit être installé au niveau système.

### Installer node

Nous recommandons l'utilisation d'`asdf` pour installer node.
* https://asdf-vm.com/
* https://github.com/asdf-vm/asdf-nodejs

### Assigner les variables d'environnement

#### Soit dans un fichier .env

Nécessite que votre machine interprète le fichier, avec par exemple [le plugin dotenv](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv) de Oh My Zsh

```
# Indispensables
# --------------

# Adresse du serveur local
URL_API=http://localhost:3000/pro

# Optionnelles
# ------------

# Pour la gestion des erreurs
JETON_CLIENT_ROLLBAR=
ROLLBAR_ENV=

# Pour afficher un message à tout le monde
ANNONCE_GENERALE=

# Pour les analytics
HOTJAR_ID=
MATOMO_ID=
```

#### Soit directement en ligne de commande

```
export URL_API=http://localhost:3000/pro
```

## Démarrer un serveur Webpack en local (mode développement)


### Démarrer l'application avec webpack server

```
$> npm install && npm run dev
```

Et se rendre sur l'adresse affichée dans la sortie standard (http://localhost:7700 par défaut)

## Démarrer l'application avec docker (mode production)

Installer `docker` si nécessaire, et exécuter la commande suivante.

```
$> docker build -t eva . && docker run --rm -ti -p 3000:80 eva
```

Une fois le message `Successfully tagged eva:latest` affiché, se rendre à l'adresse http://localhost:3000

## Lancer les tests

Pour les tests, nous utilisons `jest`

```
npm test
```

Et en mode "watch" :

```
$> npm test -- --watch
```

## Travailler avec le linter

Pour demander au linter de tenter de corriger les problèmes lancer :

```
$> npm run lint -- --fix
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

## Licence

Ce logiciel et son code source sont distribués sous [licence AGPL](https://www.gnu.org/licenses/why-affero-gpl.fr.html).
