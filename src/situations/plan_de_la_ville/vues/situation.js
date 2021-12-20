import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/apps';
import { creeStore } from '../modeles/store';
import PlanDeLaVille from './plan-de-la-ville';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, PlanDeLaVille, {}, configurationNormale);
    depotRessources.chargeConfigurations(configurationNormale);
  }
}
