import Vue, { createApp } from 'vue';

import { ATTENTE_DEMARRAGE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE } from 'commun/modeles/situation';
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
    this.app = createApp(vue, {
      identifiantSituation: this.situation.identifiant,
      onConsigneFini: () => {
        this.situation.modifieEtat(this.prochainEtat());
      }
    });
    this.app.mount(div);
  }

  prochainEtat () {
    if (this.situation.etat() === ENTRAINEMENT_FINI ||
        !this.situation.entrainementDisponible()) {
      return DEMARRE;
    }
    return ENTRAINEMENT_DEMARRE;
  }

  cache () {
    this.app.unmount();
  }
}
