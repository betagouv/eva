import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defi';
import { creeStore } from '../modeles/store';
import CafeDeLaPlace from './cafe_de_la_place';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, CafeDeLaPlace, undefined, configurationNormale);
    depotRessources.chargeConfigurations(configurationNormale);
  }
}
