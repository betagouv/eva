import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'commun/assets/consigne_demarrage_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';

export default class DepotRessourcesSecurite extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
