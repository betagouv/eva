import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'livraison/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'livraison/assets/consigne_transition.wav';

const AUDIOS_QUESTIONS = {};

export default class DepotRessourcesLivraison extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  messageAudio (nomTechniqueQuestion) {
    return this.ressource(AUDIOS_QUESTIONS[nomTechniqueQuestion]);
  }

  existeMessageAudio (nomTechniqueQuestion) {
    return nomTechniqueQuestion in AUDIOS_QUESTIONS;
  }
}
