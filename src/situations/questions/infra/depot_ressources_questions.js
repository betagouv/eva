import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage_questions.mp3';

const messagesVideos = {};

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, {}, null, sonConsigne);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
