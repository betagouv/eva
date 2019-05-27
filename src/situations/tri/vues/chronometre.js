import 'tri/styles/chronometre.scss';

import { DEMARRE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

export default class VueChronometre {
  constructor (situation, depotRessources) {
    this.depotRessources = depotRessources;
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).prepend('<div class="chronometre"></div>')
    $('.chronometre')
      .css('background-image', `url('${this.depotRessources.fondChronometre().src}')`)
      .append('<div class="minutes"></div>', '<div class="secondes"></div>');
    $('.minutes').css('background-image', `url('${this.depotRessources.aiguilleLongue().src}')`);
    $('.secondes').css('background-image', `url('${this.depotRessources.aiguilleCourte().src}')`);
    this.changeEtat(pointInsertion, $);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat(pointInsertion, $);
    });
  }

  changeEtat (pointInsertion, $) {
    const enMarche = this.situation.etat() === DEMARRE;
    $('.chronometre', pointInsertion).toggleClass('en-marche', enMarche);
  }
}
