import DepotRessourcesQuestionsBase from 'questions/infra/depot_ressources_questions_base';

import sonConsigne from 'livraison/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'livraison/assets/consigne_transition.wav';

export default class DepotRessourcesLivraison extends DepotRessourcesQuestionsBase {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
