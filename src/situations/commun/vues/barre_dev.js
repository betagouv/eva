import 'commun/styles/barre_dev.scss';

import go from '../assets/play.svg';

import { CHANGEMENT_ETAT, ATTENTE_DEMARRAGE, DEMARRE, FINI } from '../modeles/situation';

export default class VueBareDev {
  constructor (situation) {
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    const $div = $('<div class="barre-dev"></div>');
    const $go = $(`<button class="bouton-go"><img src="${go}"></button>`);
    $go.on('click', () => {
      this.situation.modifieEtat(DEMARRE);
    });
    const $fini = $('<button class="bouton-fini">FIN</button>');
    $fini.on('click', () => {
      this.situation.modifieEtat(FINI);
    });
    $div.append($go, $fini);
    $(pointInsertion).append($div);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.metAJourEtat(pointInsertion, $);
    });
  }

  metAJourEtat (pointInsertion, $) {
    const etat = this.situation.etat();

    $('.bouton-go', pointInsertion).prop('disabled', etat !== ATTENTE_DEMARRAGE);
    $('.bouton-fini', pointInsertion).prop('disabled', etat === FINI);
  }
}
