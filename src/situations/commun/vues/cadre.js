import 'commun/styles/cadre.scss';
import EvenementFin from 'commun/modeles/evenement_fin';
import { VueActions } from 'commun/vues/actions';
import { VueConsigne } from 'commun/vues/consigne';
import { VueGo } from 'commun/vues/go';
import VueTerminer from 'commun/vues/terminer';

export class VueCadre {
  constructor (vueSituation, situation, journal) {
    this.vueSituation = vueSituation;
    this.situation = situation;
    this.vueActions = new VueActions(journal);
    this.vueConsigne = new VueConsigne(situation.consigneAudio);
    this.vueGo = new VueGo(this.vueConsigne, situation, journal);
    this.vueTerminer = new VueTerminer();
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
    this.situation.observe(EvenementFin, () => {
      this.vueActions.cache($);
      this.vueTerminer.affiche(selecteurCadre, $);
    });
  }
}
