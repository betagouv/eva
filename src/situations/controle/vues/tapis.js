import 'controle/styles/tapis.scss';

import { DEMARRE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

export default class VueTapis {
  constructor (situation) {
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).append('<div class="tapis"></div>');
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
