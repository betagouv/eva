import 'commun/styles/stop.scss';
import { afficheFenetreModale } from 'commun/vues/modale.js';

export class VueStop {
  constructor (pointInsertion, $, retourAccueil = () => {
    window.location.assign('/');
  }) {
    this.$pointInsertion = $(pointInsertion);
    this.$boutonStop = $('<a id="stop" class="bouton-stop"></a>');

    this.$boutonStop.on('click', () => {
      afficheFenetreModale(this.$pointInsertion, $,
        'Voulez vous vraiment quitter la mission ?',
        retourAccueil);
    });
  }

  afficher () {
    this.$pointInsertion.append(this.$boutonStop);
  }
}
