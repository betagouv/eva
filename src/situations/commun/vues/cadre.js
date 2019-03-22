import 'commun/styles/cadre.scss';
import { VueActions } from 'commun/vues/actions.js';

export class VueCadre {
  constructor (vueSituation, journal) {
    this.vueSituation = vueSituation;
    this.vueActions = new VueActions(journal);
  }

  affiche (pointInsertion, $) {
    const $scene = $('<div class="scene"></div>');
    $(pointInsertion).append($scene);
    this.vueSituation.affiche('.scene', $);
    this.vueActions.affiche(pointInsertion, $);
  }
}
