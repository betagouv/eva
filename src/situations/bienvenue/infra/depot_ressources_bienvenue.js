import DepotRessourcesQuestionsBase from 'questions/infra/depot_ressources_questions_base';

import sonConsigne from 'commun/assets/consigne_blanche.wav';

export default class DepotRessourcesBienvenue extends DepotRessourcesQuestionsBase {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
  }
}
