import Vue from 'vue';

import { ENTRAINEMENT_DEMARRE } from 'commun/modeles/situation';
import Consigne from 'commun/vues/consigne';
import { traduction } from 'commun/infra/internationalisation';

export default class AdaptateurConsigne {
  constructor (situation, depotRessources) {
    this.situation = situation;
    Vue.prototype.depotRessources = depotRessources;
    Vue.prototype.traduction = traduction;
  }

  message () {
    return traduction(`${this.situation.identifiant}.intro_contexte.message`);
  }

  affiche (pointInsertion, $) {
    const div = document.createElement('div');
    $(pointInsertion).append(div);
    this.vm = new Vue({
      render: createEle => createEle(Consigne, {
        props: {
          message: this.message()
        }
      })
    }).$mount(div);
    this.vm.$children[0].$on('passe', () => {
      this.situation.modifieEtat(ENTRAINEMENT_DEMARRE);
    });
  }

  cache () {
    this.vm.$el.remove();
    this.vm.$destroy();
  }
}
