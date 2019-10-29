import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'securite/assets/consigne_demarrage.wav';
import fondSituation from '../assets/fond-situation.jpg';
import fondSituationEntrainement from '../assets/fond-situation-entrainement.jpg';
import pictoDangerBienIdentifie from 'securite/assets/danger_bien_identifie.svg';
import pictoDangerMalIdentifie from 'securite/assets/danger_mal_identifie.svg';

export default class DepotRessourcesSecurite extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge([fondSituation, fondSituationEntrainement, pictoDangerBienIdentifie, pictoDangerMalIdentifie]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituationEntrainement);
  }

  pictoDangerBienIdentifie () {
    return this.ressource(pictoDangerBienIdentifie);
  }

  pictoDangerMalIdentifie () {
    return this.ressource(pictoDangerMalIdentifie);
  }
}
