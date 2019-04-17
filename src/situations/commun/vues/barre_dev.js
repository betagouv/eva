import 'commun/styles/barre_dev.scss';

import go from '../assets/play.svg';

import { CHANGEMENT_ETAT, ATTENTE_DEMARRAGE, DEMARRE, FINI } from '../modeles/situation';
import { traduction } from '../infra/internationalisation';

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

    const $muet = $(`<button class="bouton-muet">${traduction('situation.barre-dev.muet')}</button>`);
    $muet.on('click', () => { this.basculeEtatMuet(pointInsertion, $); });

    const $fini = $('<button class="bouton-fini">FIN</button>');
    $fini.on('click', () => {
      this.situation.modifieEtat(FINI);
    });
    $div.append($go, $muet, $fini);
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

  basculeEtatMuet (pointInsertion, $) {
    const audios = this.situation.audios;
    let muet;
    Object.keys(audios).forEach((audio) => {
      audios[audio].muted = !audios[audio].muted;
      muet = audios[audio].muted;
    });
    $('.bouton-muet', pointInsertion).text(traduction(muet ? 'situation.barre-dev.sonore' : 'situation.barre-dev.muet'));
  }
}
