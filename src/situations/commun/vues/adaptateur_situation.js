import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';
import { synchroniseStoreEtModeleSituation } from 'commun/modeles/store';
import VueSituation from 'commun/vues/situation';

export default class AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, creeStore, ComposantActe, configurationEntrainement, configurationNormale) {
    this.situation = situation;
    this.creeStore = creeStore;
    this.ComposantActe = ComposantActe;
    this.configurationEntrainement = configurationEntrainement;
    this.configurationNormale = configurationNormale;

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
      render: createEle => createEle(VueSituation, {
        props: {
          composantActe: this.ComposantActe,
          configurationEntrainement: this.configurationEntrainement,
          configurationNormale: this.configurationNormale
        }
      })
    }).$mount(div);
  }
}
