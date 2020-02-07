import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage.wav';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs, urlServeur = process.env.URL_SERVEUR) {
    super(chargeurs, sonConsigne);
    this.urlServeur = urlServeur;
  }

  chargeEvaluation (url, nomSituation) {
    this.evaluationUrl = url;
    this.nomSituation = nomSituation;
    this.charge([url]);
  }

  questions () {
    if (this.questionnaireUrl) {
      return this.ressource(this.questionnaireUrl);
    } else {
      return this.ressource(this.evaluationUrl).questions;
    }
  }

  chargement () {
    return super.chargement()
      .then(() => {
        const evaluationJSON = this.ressource(this.evaluationUrl);
        const situation = evaluationJSON.situations.find(situation => situation.nom_technique === this.nomSituation);
        if (situation && situation.questionnaire_id) {
          this.questionnaireUrl = `${this.urlServeur}/api/questionnaires/${situation.questionnaire_id}.json`;
          return this.promesseRessource(this.questionnaireUrl);
        }
      });
  }
}
