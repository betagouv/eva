import SituationCommune, { FINI } from 'commun/modeles/situation';

export const EVENEMENT_REPONSE = 'reponse';

export default class Situation extends SituationCommune {
  constructor ({ questions }) {
    super();
    this.questions = questions;
    this.indexQuestion = 0;
  }

  question () {
    return this.questions[this.indexQuestion];
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
