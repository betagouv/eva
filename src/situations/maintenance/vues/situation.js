import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { configurationEntrainement, configurationNormale } from '../data/lexique';
import ActeMaintenance from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, ActeMaintenance, configurationEntrainement, configurationNormale);
  }
}
