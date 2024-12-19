# EVA-265: Le joueur doit pouvoir mettre en pause le bouton repeter la consigne

[Lien du ticket](https://captive-team.atlassian.net/browse/EVA-265?atlOrigin=eyJpIjoiYjY4OGU0NzdiODhkNDE2YTg1NGUxNzZmMzMzN2FjNmEiLCJwIjoiaiJ9)


## Construction de la lecture Fichier audio

### Gérer la lecture audio
`Fichier : src/situations/commun/vues/joueur_audio_buffer.js`

La class `JoueurAudioBuffer` a pour but de gérer la lecture de l'audio. On a une fonction `start` et une fonction `stop`.

La fonction `start` prend en parametre un audio a lire, et une fonction a executer une fois la lecture terminée.

La fonction `stop` va verifier si un son est en cours et l'arreter.

### Gérer la lecture d'une consigne audio
`Fichier : src/situations/commun/vues/joueur_consigne.js`

Cette class `JoueurConsigne` herite de `JoueurAudioBuffer` a pour but de gérer la lecture d'une consigne audio en utilisant les fonctionnalités de `JoueurAudioBuffer`

La function `joue` recupere l'audio et applique la methode `start` de `JoueurAudioBuffer`.


### Relancer une consigne depuis le front
`Fichier : src/situations/commun/vues/rejoue_consigne.js`

`VueRejoueConsigne` a pour but de permettre a l'utilisateur de fournir une interface utilisateur (bouton a affichier ou non), gérer la logique associée aux interactions de l'utilisateur (demarrer, relancer, stopper, mettre en pause...)

Actuellement on a deux functions : `litConsigne` et `lectureTerminee`.

La fonction `litConsigne` permets de creer l'Evenement de relecture de consigne, de cacher le bouton `play` quand la lecture est en cours pour le remplacer par un bouton `lectureEnCours`. La lecture est lancée via `joueurConsigne`

La fonction `lectureTerminee` gere l'affichage de ses bouttons a l'inverse.


## Modifier le js qui permet de gerer l'action de mise en pause.

On a deja une action stop dans le `joueur_audio_buffer`. 👍🏻

Je vais juste m'attaquer au fichier `src/situations/commun/vues/rejoue_consigne.js` afin de pouvoir arreter l'audio quand l'utilisateur le souhaite. (Dans le ticket on parle de mise en pause mais en fait c'est une action stop qu'on veut.)

1 - Creer une methode `arreteConsigne` pour gerer le stop

```js
arreteConsigne() {
	this.joueurConsigne.stop();
	this.vueBoutonArret.cache();
	this.vueBoutonLire.affiche(this.$boutonRejoueConsigne, this.$);
}
```

2 - Creer le bouton qui fait appel a cette methode avec le bon icone que j'aurais importé. 

```js
import enPause from 'commun/assets/en-pause.svg';
...

this.vueBoutonArret = new VueBouton('bouton-en-pause', enPause, () => this.arreteConsigne());
```

3 - Il va falloir mettre du style pour la class `bouton-en-pause` dans le fichier boutons.css





