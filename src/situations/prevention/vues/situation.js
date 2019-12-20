import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { creeStore } from 'securite/modeles/store';
import VueSituation from 'securite/vues/situation.vue';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, VueSituation);
  }
}
