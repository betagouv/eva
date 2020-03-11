import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigneDemarrage from 'maintenance/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'maintenance/assets/consigne_transition.wav';

import fondSituation from '../assets/fond-situation.png';

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage, sonConsigneTransition);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
