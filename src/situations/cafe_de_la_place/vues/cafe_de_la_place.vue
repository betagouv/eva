<template>
  <transition-fade>
    <defi
      v-if="carteActive.id"
      :key="carteActive.id"
      :question="carteActive"
      @reponse="reponse"
    >
      <pagination
        v-if="affichePagination"
        :indexQuestion="indexCarte"
        :nombreQuestions="nombreCartes"
      />
    </defi>
  </transition-fade>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Vue from 'vue';
import EvenementReponse from 'questions/modeles/evenement_reponse';

import Defi from 'commun/vues/defi';
import TransitionFade from 'commun/vues/transition_fade';
import Pagination from 'commun/vues/components/pagination';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';
import texteATrous from 'cafe_de_la_place/vues/components/texte_a_trous.vue';

export default {
  components: { Defi, TransitionFade, Pagination },

  mounted () {
    // enregistre globalement, les composants spécifiques utilisés par certaines questions
    Vue.component('clic_sur_mots', ClicSurMots);
    Vue.component('texte_a_trous', texteATrous);
  },

  computed: {
    ...mapState(['indexCarte', 'carteActive', 'termine']),
    ...mapGetters(['nombreCartes', 'acteEnCours']),

    affichePagination () {
      return this.carteActive.type !== 'sous-consigne';
    }
  },

  watch: {
    acteEnCours (actEnCours) {
      if(actEnCours){
        this.$store.commit('sauteALaCarte', location.hash.substring(1));
      }
    },

    termine () {
      this.$emit('terminer');
    }
  },

  methods: {
    reponse (eventReponse) {
      if(this.carteActive.type !== 'sous-consigne') {
        const donneesReponses = { question: this.carteActive.id, ...eventReponse };
        this.$store.commit('enregistreReponse', donneesReponses);
        this.$journal.enregistre(new EvenementReponse(donneesReponses));
      }
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
