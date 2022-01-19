import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage_questions.mp3';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, null, sonConsigne);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
