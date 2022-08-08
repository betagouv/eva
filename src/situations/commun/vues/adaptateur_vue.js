import Vue, { createApp } from 'vue';

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
      this.app = createApp(component, this.props);
      this.app.mount(div);
    }

    cache () {
      if (this.app) {
        this.app.unmount();
        this.app = null;
      }
    }
  };
}
