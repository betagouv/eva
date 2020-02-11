import Vue from 'vue';

import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { synchroniseStoreEtModeleSituation } from 'commun/modeles/store';

import { creeStore } from '../modeles/store';
import VueSituation from './situation.vue';
import ActeQuestions from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, registreUtilisateur) {
    super(situation, journal, depotRessources, creeStore, ActeQuestions);

    const urlEvaluation = registreUtilisateur.urlEvaluation();
    depotRessources.chargeEvaluation(urlEvaluation, situation.identifiant);
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
          composantActe: this.ComposantActe
        }
      })
    }).$mount(div);
  }
}
