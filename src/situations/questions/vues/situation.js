import { createApp } from 'vue';

import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { synchroniseStoreEtModeleSituation } from 'commun/modeles/store';

import { creeStore } from '../modeles/store';
import VueSituation from './situation.vue';
import ActeQuestions from './acte';
import { traduction } from 'commun/infra/internationalisation';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeQuestions);
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    this.store = this.creeStore();
    synchroniseStoreEtModeleSituation(this.situation, this.store);
    const app = createApp(VueSituation, {
      composantActe: this.ComposantActe,
      idSituation: this.situation.identifiant
    });
    app.config.globalProperties.$depotRessources = this.depotRessources;
    app.config.globalProperties.$traduction = traduction;
    app.config.globalProperties.$journal = this.journal;
    app.use(this.store);
    app.mount(div);
  }
}
