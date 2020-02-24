import AdaptateurCommunVueSituation from 'commun/vues/adaptateur_situation';
import { creeStore } from '../modeles/store';

export default class AdaptateurVueSituation extends AdaptateurCommunVueSituation {
  constructor (situation, journal, depotRessources) {
    super(journal, situation, depotRessources, creeStore);
  }

  affiche (pointInsertion, $) {}
}
