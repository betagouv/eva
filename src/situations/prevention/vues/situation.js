import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { creeStore } from 'prevention/modeles/store';
import ActePrevention from 'prevention/vues/acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActePrevention);
  }
}
