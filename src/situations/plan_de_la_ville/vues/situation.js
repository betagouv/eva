import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defis';
import PlanDeLaVille from './plan_de_la_ville';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, PlanDeLaVille, undefined, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationNormale]);
  }
}
