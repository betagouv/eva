import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationEntrainement, configurationNormale } from '../data/apps';
import ActeObjetsTrouves from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, ActeObjetsTrouves, configurationEntrainement, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationEntrainement, configurationNormale]);
  }
}
