import Vue from 'vue';

import { ATTENTE_DEMARRAGE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE } from 'commun/modeles/situation';
import { CONSIGNE_FINI } from 'commun/vues/consigne';
import IntroConsigne from 'commun/vues/intro_consigne';
import Transition from 'commun/vues/transition';

import { traduction } from 'commun/infra/internationalisation';

export default class AdaptateurConsigne {
  constructor (situation, depotRessources) {
    this.situation = situation;
    Vue.prototype.$depotRessources = depotRessources;
    Vue.prototype.$traduction = traduction;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    const vue = this.situation.etat() === ATTENTE_DEMARRAGE ? IntroConsigne : Transition;
    this.vm = new Vue({
      render: createEle => createEle(vue, {
        props: {
          identifiantSituation: this.situation.identifiant
        }
      })
    }).$mount(div);
    this.vm.$children[0].$on(CONSIGNE_FINI, () => {
      this.situation.modifieEtat(this.prochainEtat());
    });
  }

  prochainEtat () {
    if (this.situation.etat() === ENTRAINEMENT_FINI ||
        !this.situation.entrainementDisponible()) {
      return DEMARRE;
    }
    return ENTRAINEMENT_DEMARRE;
  }

  cache () {
    this.vm.$el.remove();
    this.vm.$destroy();
  }
}
