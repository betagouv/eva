<template>
  <code-pin
    :key="question.id"
    :question="question"
    @reponse="reponseApp"
    v-if='appDeverouillage'
  />
  <qcm
    :key="question.id"
    :question="question"
    @reponse="reponseApp"
    v-else
  />

</template>

<script>
import Qcm from 'commun/vues/qcm';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import CodePin from 'objets_trouves/vues/code_pin';

export default {
  components: { Qcm, CodePin },

  props: {
    questions: {
      type: Array,
      required: true
    },
    app: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      indexQuestion: 0
    };
  },

  computed: {
    appDeverouillage () {
      return this.app === 'deverouillage';
    },
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
