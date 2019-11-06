import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';

export function creeAdapteur (component) {
  return class AdaptateurVue {
    constructor (situation, depotRessources) {
      Vue.prototype.$depotRessources = depotRessources;
      Vue.prototype.$traduction = traduction;
    }

    affiche (pointInsertion, $) {
      if (this.vm) {
        return;
      }
      const div = document.createElement('div');
      $(pointInsertion).append(div);
      this.vm = new Vue({
        render: createEle => createEle(component)
      }).$mount(div);
    }

    cache () {
      if (this.vm) {
        this.vm.$el.remove();
        this.vm.$destroy();
        this.vm = null;
      }
    }
  };
}
