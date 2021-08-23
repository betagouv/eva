import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import { illustrationsQuestions } from '../data/apps';

import RegistreCampagne from 'commun/infra/registre_campagne';
import RegistreQuestionnaire from 'commun/infra/registre_questionnaire';

export default class DepotRessourcesQuestionsBase extends DepotRessourcesCommunes {
  constructor (chargeurs, sonConsigne, sonConsigneTransition, urlServeur = process.env.URL_API, registreCampagne = new RegistreCampagne(), registreQuestionnaire = new RegistreQuestionnaire()) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
    this.urlServeur = urlServeur;
    this.registreCampagne = registreCampagne;
    this.registreQuestionnaire = registreQuestionnaire;
  }

  chargeEvaluation (url, nomSituation) {
    this.evaluationUrl = url;
    this.nomSituation = nomSituation;
    const campagne = this.registreCampagne.recupereCampagneCourante();
    this.setRessource(this.evaluationUrl, campagne);
  }

  questions () {
    if (this.questionnaireUrl) {
      return this.ressource(this.questionnaireUrl);
    } else {
      return this.ressource(this.evaluationUrl).then((campagne) => {
        campagne.questions;
      });
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
    return this.ressource(this.evaluationUrl).then((campagne) => {
      const situation = campagne.situations.find(situation => situation.nom_technique === this.nomSituation);
      if (!situation) return;

      const promesses = [];
      if (situation.questionnaire_id) {
        this.questionnaireUrl = this.registreQuestionnaire.urlQuestionnaire(situation.questionnaire_id)

        promesses.push(this.setRessource(this.questionnaireUrl, situation.questionnaire));
      }
      if (situation.questionnaire_entrainement_id) {
        this.questionnaireEntrainementUrl = this.registreQuestionnaire.urlQuestionnaire(situation.questionnaire_entrainement_id)

        promesses.push(this.setRessource(this.questionnaireEntrainementUrl, situation.questionnaire_entrainement));
      }
      return Promise.all(promesses);
    });
  }

  chargeIllustrations () {
    const questions = this.questions();
    const questionsEntrainement = this.questionsEntrainement();
    const images = [...questions, ...questionsEntrainement].map(question => {
      question.illustration = '';
      if (question.nom_technique && illustrationsQuestions[question.nom_technique]) {
        question.illustration = illustrationsQuestions[question.nom_technique];
      } else {
        throw new Error(`La question ${question.id} ne possède pas d'illustration`);
      }
      return question.illustration;
    });

    this.charge(images);
    return super.chargement();
  }
}
