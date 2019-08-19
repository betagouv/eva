import SituationCommune, { FINI } from 'commun/modeles/situation';

export const EVENEMENT_REPONSE = 'reponse';

export default class Situation extends SituationCommune {
  constructor () {
    super();
    this.indexQuestion = 0;
  }

  questions (questions) {
    this.questions = questions;
  }

  question () {
    return this.questions[this.indexQuestion];
  }

  numeroQuestionCourante () {
    return this.indexQuestion + 1;
  }

  nombreQuestions () {
    return this.questions.length;
  }

  repond (reponse) {
    const question = this.question();
    this.indexQuestion++;
    if (this.indexQuestion === this.questions.length) {
      this.modifieEtat(FINI);
    }
    this.emit(EVENEMENT_REPONSE, question, reponse);
  }
}
