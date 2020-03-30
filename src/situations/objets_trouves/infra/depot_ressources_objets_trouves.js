import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'objets_trouves/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'objets_trouves/assets/consigne_transition.wav';

import fondSituation from '../assets/accueil.png';
import appPhoto from '../assets/app-photo.png';

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
    this.charge([fondSituation, appPhoto]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
