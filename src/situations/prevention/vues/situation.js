import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { configurationEntrainement, configurationNormale } from '../data/zones';
import { creeStore } from '../modeles/store';
import ActePrevention from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActePrevention, configurationEntrainement, configurationNormale);
  }
}
