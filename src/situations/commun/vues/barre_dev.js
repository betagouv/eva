import 'commun/styles/barre_dev.scss';

import go from '../assets/play.svg';

import { DEMARRE, FINI } from '../modeles/situation';

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
  }
}
