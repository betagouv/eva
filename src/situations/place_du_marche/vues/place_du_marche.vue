<template>
  <transition-fade>
    <defi
      v-if="carteActive.id"
      :key="carteActive.id"
      :question="carteActive"
      @reponse="reponse"
    >
      <pagination
        :indexQuestion="indexCarte"
        :nombreQuestions="nombreCartes"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

export default {
  components: { Defi, TransitionFade, Pagination },

  computed: {
    ...mapState(['indexCarte', 'carteActive', 'termine']),
    ...mapGetters(['nombreCartes']),
  },

  watch: {
    termine () {
      this.$emit('terminer');
    }
  },

  methods: {
    reponse (reponse) {
      this.$store.commit('enregistreReponse', reponse);
      this.$journal.enregistre(new EvenementReponse(reponse));
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
