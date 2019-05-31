import 'controle/styles/tapis.scss';

import { DEMARRE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

export default class VueTapis {
  constructor (situation, depotRessources) {
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const $tapis = $('<div class="tapis"></div>')
      .css('background-image', `url('${this.depotRessources.tapis().src}')`);
    $(pointInsertion).append($tapis);
    this.changeEtat(pointInsertion, $);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat(pointInsertion, $);
    });
  }

  changeEtat (pointInsertion, $) {
    const enMarche = this.situation.etat() === DEMARRE;
    $('.tapis', pointInsertion).toggleClass('en-marche', enMarche);
  }
}
