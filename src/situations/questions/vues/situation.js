import { createApp } from 'vue';

import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { synchroniseStoreEtModeleSituation } from 'commun/modeles/store';

import { creeStore } from '../modeles/store';
import VueSituation from './situation.vue';
import ActeQuestions from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeQuestions);
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    const store = this.creeStore();
    synchroniseStoreEtModeleSituation(this.situation, store);
    const app = createApp(VueSituation, {
      composantActe: this.ComposantActe,
      idSituation: this.situation.identifiant
    });
    app.use(store);
    app.mount(div);
  }
}
