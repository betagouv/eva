import SituationCommune, { FINI } from 'commun/modeles/situation';

export const EVENEMENT_REPONSE = 'reponse';

export default class Situation extends SituationCommune {
  constructor () {
    super();
    this.indexQuestion = 0;
    this.resultat = {
      bon: 0,
      mauvais: 0,
      abstention: 0
    };
  }

  questions (questions) {
    this._questions = questions;
  }

  question () {
    return this._questions[this.indexQuestion];
  }

  numeroQuestionCourante () {
    return this.indexQuestion + 1;
  }

  nombreQuestions () {
    return this._questions.length;
  }

  repond (reponse) {
    const question = this.question();
    this.indexQuestion++;
    if (question.type === 'qcm') {
      const choix = question.choix.find(choix => choix.id === reponse);
      this.resultat[choix.type_choix]++;
    }
    this.emit(EVENEMENT_REPONSE, question, reponse);
    if (this.indexQuestion === this._questions.length) {
      this.modifieEtat(FINI);
    }
  }
}
