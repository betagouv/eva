import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'commun/assets/consigne_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';
import risque21 from '../assets/risque2-1.png';
import risque22 from '../assets/risque2-2.png';
import ok from '../assets/ok.svg';
import danger from '../assets/danger.svg';
import urgence from '../assets/urgence.svg';

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
    this.charge([fondSituation, ok, danger, urgence, risque21, risque22]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  ok () {
    return this.ressource(ok);
  }

  danger () {
    return this.ressource(danger);
  }

  urgence () {
    return this.ressource(urgence);
  }

  risque21 () {
    return this.ressource(risque21);
  }

  risque22 () {
    return this.ressource(risque22);
  }
}
