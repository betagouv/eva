import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'tri/assets/consigne_demarrage.mp3';
import fondSituation from 'tri/assets/fond-situation.jpg';

export default class DepotRessourcesTri extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
