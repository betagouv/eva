<template>
  <qcm
    :key="question.id"
    :question="question"
    @reponse="reponseApp"
  />
</template>

<script>
import Qcm from 'commun/vues/qcm';
import EvenementReponse from 'questions/modeles/evenement_reponse';

export default {
  components: { Qcm },

  props: {
    questions: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      indexQuestion: 0
    };
  },

  computed: {
    question () {
      return this.questions[this.indexQuestion];
    }
  },

  methods: {
    reponseApp (reponse) {
      this.$journal.enregistre(new EvenementReponse({ question: this.question.id, reponse }));

      if (this.indexQuestion + 1 === this.questions.length) {
        this.$emit('finQuestions');
      } else {
        this.indexQuestion++;
      }
    }
  }
};
</script>
