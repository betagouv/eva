import { traduction } from 'commun/infra/internationalisation';
import EvenementStop from 'commun/modeles/evenement_stop';
import { STOPPEE } from 'commun/modeles/situation';
import stop from 'commun/assets/stop.svg';

import 'commun/styles/stop.scss';
import { afficheFenetreModale } from 'commun/vues/modale';

export default class VueStop {
  constructor (situation, journal, retourAccueil = () => {
    window.location.assign('/');
  }) {
    this.situation = situation;
    this.journal = journal;
    this.retourAccueil = retourAccueil;
  }

  affiche (pointInsertion, $) {
    const $boutonStop = $('<a id="stop" class="bouton-stop"></a>');
    $boutonStop.append(`<img src='${stop}'>`);

    $boutonStop.on('click', () => {
      afficheFenetreModale(
        pointInsertion,
        $,
        traduction('situation.stop'),
        this.clickSurOk.bind(this)
      );
    });
    $(pointInsertion).append($boutonStop);
  }

  clickSurOk () {
    this.situation.modifieEtat(STOPPEE);
    return this.journal
      .enregistre(new EvenementStop(), 1000)
      .finally(() => {
        this.retourAccueil();
      });
  }
}
