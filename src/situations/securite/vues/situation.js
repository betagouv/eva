import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';
import { creeStore, synchroniseStoreEtModeleSituation } from '../store/store';
import Situation from './situation.vue';

export default class VueSituation {
  constructor (situation, journal, depotRessources, registreUtilisateur) {
    this.situation = situation;
    this.depotRessources = depotRessources;

    Vue.prototype.depotRessources = depotRessources;
    Vue.prototype.traduction = traduction;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    const store = creeStore();
    synchroniseStoreEtModeleSituation(this.situation, store);
    new Vue({
      store,
      render: createEle => createEle(Situation)
    }).$mount(div);
  }
}
