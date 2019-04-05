import { traduction } from 'commun/infra/internationalisation';
import EvenementStop from 'commun/modeles/evenement_stop';
import stop from 'commun/assets/stop.svg';

import 'commun/styles/stop.scss';
import { afficheFenetreModale } from 'commun/vues/modale';

export class VueStop {
  constructor (pointInsertion, $, journal, retourAccueil = () => {
    window.location.assign('/');
  }) {
    this.journal = journal;
    this.retourAccueil = retourAccueil;
    this.$pointInsertion = $(pointInsertion);
    this.$boutonStop = $('<a id="stop" class="bouton-stop"></a>');
    this.$boutonStop.append(`<img src='${stop}'>`);

    this.$boutonStop.on('click', () => {
      afficheFenetreModale(
        this.$pointInsertion,
        $,
        traduction('situation.stop'),
        this.clickSurOk.bind(this)
      );
    });
  }

  affiche () {
    this.$pointInsertion.append(this.$boutonStop);
  }

  clickSurOk () {
    return this.journal
      .enregistre(new EvenementStop())
      .then(() => {
        this.retourAccueil();
      });
  }
}
