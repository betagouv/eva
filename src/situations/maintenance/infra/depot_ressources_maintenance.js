import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.wav';
import fondSituation from '../assets/fond-situation.jpg';
import croix from '../assets/croix.png';

export default class DepotRessourcesMaintenance extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge([fondSituation, croix]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  croix () {
    return this.ressource(croix);
  }
}
