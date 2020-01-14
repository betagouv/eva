import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'commun/assets/consigne_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';
import risque21 from '../assets/risque2-1.png';
import risque22 from '../assets/risque2-2.png';

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
    this.charge([fondSituation, risque21, risque22]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  risque21 () {
    return this.ressource(risque21);
  }

  risque22 () {
    return this.ressource(risque22);
  }
}
