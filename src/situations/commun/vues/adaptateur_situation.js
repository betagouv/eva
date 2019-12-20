import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';
import { synchroniseStoreEtModeleSituation } from 'commun/modeles/store';

export default class AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, creeStore, VueSituation) {
    this.situation = situation;
    this.creeStore = creeStore;
    this.VueSituation = VueSituation;

    Vue.prototype.$depotRessources = depotRessources;
    Vue.prototype.$traduction = traduction;
    Vue.prototype.$journal = journal;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    const store = this.creeStore();
    synchroniseStoreEtModeleSituation(this.situation, store);
    new Vue({
      store,
      render: createEle => createEle(this.VueSituation)
    }).$mount(div);
  }
}
