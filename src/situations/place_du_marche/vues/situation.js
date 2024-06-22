import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defis';
import { creeStore } from '../modeles/store';
import PlaceDuMarche from './place_du_marche';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, PlaceDuMarche, undefined, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationNormale]);
  }
}
