import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationEntrainement, configurationNormale } from '../data/apps';
import { creeStore } from '../modeles/store';
import ActeObjetsTrouves from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeObjetsTrouves, configurationEntrainement, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationEntrainement, configurationNormale]);
  }
}
