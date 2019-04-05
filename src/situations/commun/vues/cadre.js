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
    const $cadre = $('<div id="cadre" class="conteneur"></div>');
    $(pointInsertion).append($cadre);

    $cadre.append($('<div class="scene"></div>'));
    this.vueSituation.affiche('.scene', $);

    const selecteurCadre = '#cadre';
    this.vueActions.affiche(selecteurCadre, $);
    this.vueConsigne.affiche(selecteurCadre);
    this.vueGo.affiche(selecteurCadre, $);
  }
}
