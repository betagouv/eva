<template>
  <div>
    <icone-app-active />
    <qcm
      :key="question.id"
      :question="question"
      @reponse="reponseApp"
    />
  </div>
</template>

<script>
import Qcm from 'commun/vues/qcm';
import IconeAppActive from 'objets_trouves/vues/icone-app-active';
import EvenementReponse from 'questions/modeles/evenement_reponse';

export default {
  components: { Qcm, IconeAppActive },

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
      const donneesReponses = { question: this.question.id, metacompetence: this.question.metacompetence, ...reponse };
      this.$journal.enregistre(new EvenementReponse(donneesReponses));

      if (this.indexQuestion + 1 === this.questions.length) {
        this.$emit('finQuestions');
      } else {
        this.indexQuestion++;
      }
    }
  }
};
</script>
