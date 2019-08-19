export default class VueProgression {
  constructor (situation) {
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    this.$vue = $(`
      <div class="progression-question">${this.situation.numeroQuestionCourante()}/${this.situation.nombreQuestions()}</div>
    `);
    $(pointInsertion).append(this.$vue);
  }
}
