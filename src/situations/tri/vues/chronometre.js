import 'tri/styles/chronometre.scss';

import { DEMARRE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

export default class VueChronometre {
  constructor (situation, depotRessources) {
    this.depotRessources = depotRessources;
    this.situation = situation;
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      this.changeEtat(etat);
    });
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).append('<div class="chronometre-container"></div>');
    this.chronometreConteneur = $('.chronometre-container');
    const chronometreContenu = `<img class='chronometre' src="${this.depotRessources.fondChronometre().src}">
                                <img class='aiguille-minute' src=${this.depotRessources.aiguilleLongue().src}>
                                <img class='aiguille-seconde' src=${this.depotRessources.aiguilleCourte().src}>`;
    this.chronometreConteneur.append(chronometreContenu);
    this.changeEtat(pointInsertion, $);
  }

  changeEtat (etat) {
    const enMarche = this.situation.etat() === DEMARRE;
    this.chronometreConteneur.toggleClass('actif', enMarche);
  }
}
