import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';
import { creeStore, synchroniseStoreEtModeleSituation } from '../store/store';
import { zones, dangers } from '../data/zones';
import rapporteAuJournal from '../modeles/rapporteur';
import Situation from './situation.vue';

export default class VueSituation {
  constructor (situation, journal, depotRessources, registreUtilisateur) {
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.journal = journal;

    Vue.prototype.depotRessources = depotRessources;
    Vue.prototype.traduction = traduction;
    Vue.prototype.journal = journal;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    const store = creeStore();
    store.commit('chargeZonesEtDangers', { zones, dangers });
    synchroniseStoreEtModeleSituation(this.situation, store);
    rapporteAuJournal(store, this.journal);
    new Vue({
      store,
      render: createEle => createEle(Situation)
    }).$mount(div);
  }
}
