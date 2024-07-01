function estSucces(reponses, reponsesAttendues) {
  const reponsesTriees = Array.from(reponses).sort();
  const reponseAttenduesTriees = Array.from(reponsesAttendues).sort();
  return reponseAttenduesTriees.length === reponsesTriees.length &&
    reponseAttenduesTriees.every((pays, index) => pays === reponsesTriees[index]);
}

export default {
  props: {
    question: {
      type: Object,
      required: true
    },
  },

  methods: {
    emetReponseMultiple (reponse) {
      if (reponse.length === 0) {
        this.$emit('reponse');
      } else {
        const succes = estSucces(reponse, this.question.reponse.bonne_reponse);
        const score = succes ? this.question.score : 0;
        this.$emit('reponse', { score, succes, reponse });
      }
    }
  }
};
