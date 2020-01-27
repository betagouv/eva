import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { configurationEntrainement, configurationNormale } from '../data/lexique';
import { creeStore } from '../modeles/store';
import ActeMaintenance from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeMaintenance, configurationEntrainement, configurationNormale);
  }
}
