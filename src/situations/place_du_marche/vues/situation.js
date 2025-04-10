import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defis';
import PlaceDuMarche from './place_du_marche';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, PlaceDuMarche, undefined, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationNormale]);
  }
}
