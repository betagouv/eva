import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.wav';

import fondSituation from '../assets/accueil.png';
import appPhoto from '../assets/app-photo.png';

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneBlanche, sonConsigneBlanche);
    this.charge([fondSituation, appPhoto]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
