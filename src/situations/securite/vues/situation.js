import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { configurationEntrainement, configurationNormale } from '../data/zones';
import ActeSecurite from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, ActeSecurite, configurationEntrainement, configurationNormale);
  }
}
