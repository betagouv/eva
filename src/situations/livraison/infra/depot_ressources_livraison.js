import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'livraison/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'livraison/assets/consigne_transition.wav';

export default class DepotRessourcesLivraison extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  existeMessageAudio (nomTechniqueQuestion) {
    return false;
  }
}
