import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { configurationNormale } from '../data/defis';
import CafeDeLaPlace from './cafe_de_la_place';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources, store) {
    super(situation, journal, depotRessources, store, CafeDeLaPlace, undefined, configurationNormale);
    depotRessources.chargeIllustrationsConfigurations([configurationNormale]);
  }
}
