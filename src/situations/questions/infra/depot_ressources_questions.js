import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage_questions.mp3';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';
import { illustrationsQuestions } from '../data/illustrations';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs, messagesVideos = {}, messagesAudio = {}, fondConsigne = null, sonConsigneDemarrage = sonConsigne, sonConsigneTransition = sonConsigneBlanche ) {
    super(chargeurs, messagesVideos, messagesAudio, fondConsigne, sonConsigneDemarrage, sonConsigneTransition);
    this.charge([...new Set(Object.values(illustrationsQuestions))]);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  illustrationQuestion (question) {
    if (question.nom_technique && illustrationsQuestions[question.nom_technique]) {
      return this.ressource(illustrationsQuestions[question.nom_technique]);
    } else {
      throw new Error(`La question ${question.id} avec le nom technique "${question.nom_technique}" ne possède pas d'illustration`);
    }
  }
}
