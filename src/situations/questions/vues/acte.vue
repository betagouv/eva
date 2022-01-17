<template>
  <div :key="etat">
    <transition-fade mode="out-in">
      <defi
        v-if="questionCourante"
        :key="questionCourante.id"
        :question="questionCourante"
        @reponse="repondQuestion"
        :envoyerEvenementAffichage="acteEnCours"
      >
        <pagination
          :indexQuestion="indexQuestion"
          :nombreQuestions="nombreQuestions"
        />
      </defi>
    </transition-fade>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import EvenementReponse from '../modeles/evenement_reponse';
import TransitionFade from 'commun/vues/transition_fade';
import Defi from 'commun/vues/defi';
import { DEMARRE } from 'commun/modeles/situation';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { TransitionFade, Pagination, Defi },
  computed: {
    ...mapState(['indexQuestion', 'etat', 'fini']),
    ...mapGetters(['questionCourante', 'nombreQuestions']),

    acteEnCours () {
      return this.etat === DEMARRE;
    }
  },

  methods: {
    repondQuestion (reponse) {
      this.$journal.enregistre(new EvenementReponse({ question: this.questionCourante.id, ...reponse }));
      this.$store.commit('repondQuestionCourante');
    }
  },

  watch: {
    fini (fini) {
      if (fini) this.$emit('terminer');
    }
  }
};
</script>
