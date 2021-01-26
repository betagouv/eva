import Vue from 'vue';

import { traduction } from 'commun/infra/internationalisation';

export function creeAdaptateur (component, proprietes = {}) {
  return class AdaptateurVue {
    constructor (situation, depotRessources, props = proprietes) {
      Vue.prototype.$depotRessources = depotRessources;
      Vue.prototype.$traduction = traduction;
      this.props = props;
    }

    affiche (pointInsertion, $) {
      if (this.vm) {
        return;
      }
      const div = document.createElement('div');
      $(pointInsertion).append(div);
      this.vm = new Vue({
        render: createEle => createEle(component, { props: this.props })
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
