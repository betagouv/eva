import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/apps';
import { creeStore } from '../modeles/store';
import ActePlanDeLaVille from './acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActePlanDeLaVille, {}, configurationNormale);
    depotRessources.chargeConfigurations(configurationNormale);
  }
}
