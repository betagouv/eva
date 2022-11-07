import { createApp } from 'vue';

import { traduction } from '../infra/internationalisation';
import { synchroniseStoreEtModeleSituation } from '../modeles/store';
import VueSituation from './situation';
import { erreurVue } from '../infra/report_erreurs';

export default class AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, creeStore, ComposantActe, configurationEntrainement, configurationNormale) {
    this.situation = situation;
    this.creeStore = creeStore;
    this.ComposantActe = ComposantActe;
    this.configurationEntrainement = configurationEntrainement;
    this.configurationNormale = configurationNormale;

    this.depotRessources = depotRessources;
    this.journal = journal;
  }

  affiche (pointInsertion) {
    const store = this.creeStore();
    synchroniseStoreEtModeleSituation(this.situation, store);
    const app = createApp(VueSituation,
      {
        composantActe: this.ComposantActe,
        configurationEntrainement: this.configurationEntrainement,
        configurationNormale: this.configurationNormale
      }
    );
    app.config.globalProperties.$depotRessources = this.depotRessources;
    app.config.globalProperties.$traduction = traduction;
    app.config.globalProperties.$journal = this.journal;
    app.config.errorHandler = erreurVue;
    app.use(store);
    app.mount(pointInsertion);
  }
}
