<template>
  <transition-fade>
    <div
      :style="{ 'background-image': `url(${fondSituation})` }"
      class="fond-situation"
    >
      <qcm
          v-if='questions.length'
          :key="questionActive.id"
          :question="questionActive"
          @reponse="reponseQuestion"
        />
    </div>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import Qcm from 'commun/vues/qcm';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import ClicMaisonBleue from 'plan_de_la_ville/vues/components/clic_maison_bleue.vue';
import TransitionFade from 'commun/vues/transition_fade';
import Vue from 'vue';
import 'plan_de_la_ville/styles/acte.scss';

export default {
  components: { Qcm, TransitionFade },

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
    ...mapState(['questions', 'fondSituation']),

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
