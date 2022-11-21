import { createApp } from 'vue';

import { ATTENTE_DEMARRAGE, ENTRAINEMENT_DEMARRE, DEMARRE } from 'commun/modeles/situation';
import IntroConsigne from 'commun/vues/intro_consigne';
import Transition from 'commun/vues/transition';

import { traduction } from 'commun/infra/internationalisation';

export default class AdaptateurConsigne {
  constructor (situation, depotRessources) {
    this.situation = situation;
    const vue = situation.etat() === ATTENTE_DEMARRAGE ? IntroConsigne : Transition;
    this.app = createApp(vue, {
      identifiantSituation: this.situation.identifiant,
      onConsigneFini: () => {
        this.situation.modifieEtat(this.prochainEtat());
      }
    });
    this.app.config.globalProperties.$depotRessources = depotRessources;
    this.app.config.globalProperties.$traduction = traduction;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    this.app.mount(div);
  }

  prochainEtat () {
    if (this.situation.etat() === ATTENTE_DEMARRAGE &&
        this.situation.entrainementDisponible()) {
      return ENTRAINEMENT_DEMARRE;
    }
    return DEMARRE;
  }

  cache () {
    this.app.unmount();
  }
}
