import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'commun/assets/consigne_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
