import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import { illustrationsQuestions } from '../data/apps';

export default class DepotRessourcesQuestionsBase extends DepotRessourcesCommunes {
  constructor (chargeurs, sonConsigne, sonConsigneTransition, urlServeur = process.env.URL_API) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
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

  questionsEntrainement () {
    if (this.questionnaireEntrainementUrl) {
      return this.ressource(this.questionnaireEntrainementUrl);
    }
    return [];
  }

  chargement () {
    return super.chargement()
      .then(() => this.chargeQuestionnaires())
      .then(() => this.chargeIllustrations());
  }

  chargeQuestionnaires () {
    const evaluationJSON = this.ressource(this.evaluationUrl);
    const situation = evaluationJSON.situations.find(situation => situation.nom_technique === this.nomSituation);
    if (!situation) return;

    const promesses = [];
    if (situation.questionnaire_id) {
      this.questionnaireUrl = `${this.urlServeur}/api/questionnaires/${situation.questionnaire_id}.json`;
      promesses.push(this.promesseRessource(this.questionnaireUrl));
    }
    if (situation.questionnaire_entrainement_id) {
      this.questionnaireEntrainementUrl = `${this.urlServeur}/api/questionnaires/${situation.questionnaire_entrainement_id}.json`;
      promesses.push(this.promesseRessource(this.questionnaireEntrainementUrl));
    }
    return Promise.all(promesses);
  }

  chargeIllustrations () {
    const images = [...this.questions(), ...this.questionsEntrainement()].map(question => {
      question.illustration = '';
      if (question.nom_technique && illustrationsQuestions[question.nom_technique]) {
        question.illustration = illustrationsQuestions[question.nom_technique];
      }
      return question.illustration;
    })
      .filter(illustration => illustration !== '');
    this.charge(images);
    return super.chargement();
  }
}
