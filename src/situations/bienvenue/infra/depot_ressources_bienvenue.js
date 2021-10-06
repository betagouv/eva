import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'bienvenue/assets/consigne_demarrage.wav';
import bienvenueConcentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.wav';

const AUDIOS_QUESTIONS = {
  bienvenue_1: bienvenueConcentrationQuestion
};

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge(Object.values(AUDIOS_QUESTIONS));
  }

  messageAudio (nomTechniqueQuestion) {
    return this.ressource(AUDIOS_QUESTIONS[nomTechniqueQuestion]);
  }

  existeMessageAudio (nomTechniqueQuestion) {
    return nomTechniqueQuestion in AUDIOS_QUESTIONS;
  }
}
