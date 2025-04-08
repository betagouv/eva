import { createApp } from 'vue';

import { traduction } from 'commun/infra/internationalisation';

export function creeAdaptateur (component, proprietes = {}) {
  return class AdaptateurVue {
    constructor (situation, depotRessources, props = proprietes, store = null) {
      this.depotRessources = depotRessources;
      this.store = store;
      this.props = props;
    }

    affiche (pointInsertion, $) {
      if (this.app) {
        return;
      }
      const div = document.createElement('div');
      $(pointInsertion).append(div);
      this.app = createApp(component, {
        ...this.props,
        onFerme: () => {
          this.cache();
        }
      });
      if (this.store) {
        this.app.config.globalProperties.$store = this.store;
      }
      this.app.config.globalProperties.$depotRessources = this.depotRessources;
      this.app.config.globalProperties.$traduction = traduction;
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
