import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'commun/assets/consigne_demarrage_blanche.wav';
import fondSituation from '../assets/fond-situation.jpg';
import pictoDangerBienIdentifie from 'securite/assets/danger_bien_identifie.svg';
import pictoDangerMalIdentifie from 'securite/assets/danger_mal_identifie.svg';

export default class DepotRessourcesSecurite extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([fondSituation, pictoDangerBienIdentifie, pictoDangerMalIdentifie]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  pictoDangerBienIdentifie () {
    return this.ressource(pictoDangerBienIdentifie);
  }

  pictoDangerMalIdentifie () {
    return this.ressource(pictoDangerMalIdentifie);
  }
}
