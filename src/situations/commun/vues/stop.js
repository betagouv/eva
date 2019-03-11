import { traduit } from 'commun/infra/internationalisation';

import 'commun/styles/stop.scss';
import { afficheFenetreModale } from 'commun/vues/modale.js';

export class VueStop {
  constructor (pointInsertion, $, journal, retourAccueil = () => {
    window.location.assign('/');
  }) {
    this.$pointInsertion = $(pointInsertion);
    this.$boutonStop = $('<a id="stop" class="bouton-stop"></a>');

    this.$boutonStop.on('click', () => {
      afficheFenetreModale(this.$pointInsertion, $,
        traduit('situation.stop'),
        () => { journal.enregistreStop(); retourAccueil(); });
    });
  }

  afficher () {
    this.$pointInsertion.append(this.$boutonStop);
  }
}
