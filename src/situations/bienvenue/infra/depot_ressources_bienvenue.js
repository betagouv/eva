import DepotRessourcesQuestionsBase from 'questions/infra/depot_ressources_questions_base';

import sonConsigne from 'bienvenue/assets/consigne_demarrage.wav';

export default class DepotRessourcesBienvenue extends DepotRessourcesQuestionsBase {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
  }
}
