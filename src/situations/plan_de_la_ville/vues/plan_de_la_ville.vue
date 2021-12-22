<template>
  <transition-fade>
    <qcm
      v-if="questions.length"
      :key="questionActive.id"
      :question="questionActive"
      @reponse="reponseQuestion"
    >
      <pagination
        :indexQuestion="indexQuestion"
        :nombreQuestions="questions.length"
      />
    </qcm>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';
import Qcm from 'commun/vues/qcm';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import ClicMaisonBleue from 'plan_de_la_ville/vues/components/clic_maison_bleue.vue';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { Qcm, TransitionFade, Pagination },

  data () {
    return {
      indexQuestion: 0
    };
  },

  mounted () {
    // enregistre globalement, les composants spécifiques utilisés par certaines questions
    Vue.component('clic-maison-bleue', ClicMaisonBleue);
  },

  computed: {
    ...mapState(['questions']),

    questionActive () {
      return this.questions[this.indexQuestion];
    }
  },

  methods: {
    reponseQuestion (reponse) {
      const donneesReponses = { question: this.questionActive.id, ...reponse };
      this.$journal.enregistre(new EvenementReponse(donneesReponses));

      if (this.indexQuestion + 1 === this.questions.length) {
        this.$emit('terminer');
      } else {
        this.indexQuestion++;
      }
    }
  }
};
</script>
