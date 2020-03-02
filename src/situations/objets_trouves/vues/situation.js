import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import Vue from 'vue';
import { creeStore } from '../modeles/store';
import vueAccueil from './accueil';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(journal, situation, depotRessources, creeStore);
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    new Vue({
      render: function (createElement) {
        return createElement(vueAccueil);
      }
    }).$mount(div);
  }
}
