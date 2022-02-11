import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defis';
import { creeStore } from '../modeles/store';
import PlanDeLaVille from './plan_de_la_ville';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, PlanDeLaVille, undefined, configurationNormale);
    depotRessources.chargeConfigurations(configurationNormale);
  }
}
