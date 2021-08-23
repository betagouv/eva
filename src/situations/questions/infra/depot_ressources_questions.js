import DepotRessourcesQuestionsBase from './depot_ressources_questions_base';

import sonConsigne from 'questions/assets/consigne_demarrage.wav';

import RegistreCampagne from 'commun/infra/registre_campagne';
import RegistreQuestionnaire from 'commun/infra/registre_questionnaire';

export default class DepotRessourcesQuestions extends DepotRessourcesQuestionsBase {
  constructor (chargeurs, urlServeur, registreCampagne = new RegistreCampagne(), registreQuestionnaire = new RegistreQuestionnaire) {
    super(chargeurs, sonConsigne, undefined, urlServeur, registreCampagne, registreQuestionnaire);
  }
}
