import DepotRessourcesQuestionsBase from './depot_ressources_questions_base';

import sonConsigne from 'questions/assets/consigne_demarrage.wav';

export default class DepotRessourcesQuestions extends DepotRessourcesQuestionsBase {
  constructor (chargeurs, urlServeur) {
    super(chargeurs, sonConsigne, undefined, urlServeur);
  }
}
