import 'commun/styles/cadre.scss';
import { VueActions } from 'commun/vues/actions';
import { VueConsigne } from 'commun/vues/consigne';
import { VueGo } from 'commun/vues/go';

export class VueCadre {
  constructor (vueSituation, situation, journal) {
    this.vueSituation = vueSituation;
    this.vueActions = new VueActions(journal);
    this.vueConsigne = new VueConsigne(situation.consigneAudio);
    this.vueGo = new VueGo(this.vueConsigne, situation, journal);
  }

  affiche (pointInsertion, $) {
    const $scene = $('<div class="scene"></div>');
    $(pointInsertion).append($scene);
    this.vueSituation.affiche('.scene', $);
    this.vueActions.affiche(pointInsertion, $);

    this.vueConsigne.affiche(pointInsertion);
    this.vueGo.affiche(pointInsertion, $);
  }
}
