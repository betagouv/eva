import SituationCommune from 'commun/modeles/situation';
import Vue from 'vue';
import vueLexique from './lexique';
import { lexique } from '../data/lexique';

export default class Situation extends SituationCommune {
  constructor (situation, journal, depotRessources) {
    super();
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    new Vue({
      render: function (createElement) {
        return createElement(vueLexique,
          {
            props:
            { lexique: lexique }
          }
        );
      }
    }).$mount(div);
  }
}
