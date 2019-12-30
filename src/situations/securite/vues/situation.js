import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';

import { creeStore } from '../modeles/store';
import ActeSecurite from 'securite/vues/acte';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(situation, journal, depotRessources, creeStore, ActeSecurite);
  }
}
