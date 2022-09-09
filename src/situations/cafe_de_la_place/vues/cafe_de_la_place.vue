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
import listeCoursesATrous from 'cafe_de_la_place/vues/components/liste_courses_a_trous.vue';
import emailHPfbATrous from 'cafe_de_la_place/vues/components/email_HPfb_a_trous.vue';
import Puzzle from 'cafe_de_la_place/vues/components/puzzle.vue';
import Graphique from 'cafe_de_la_place/vues/components/graphique.vue';

export default {
  components: { Defi, TransitionFade, Pagination },

  mounted () {
    // enregistre globalement, les composants spécifiques utilisés par certaines questions
    Vue.component('clic-sur-mots', ClicSurMots);
    Vue.component('liste-courses-a-trous', listeCoursesATrous);
    Vue.component('email-HPfb-a-trous', emailHPfbATrous);
    Vue.component('puzzle', Puzzle);
    Vue.component('graphique', Graphique);
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
      if(actEnCours && location.hash){
        this.$store.commit('sauteALaCarte', location.hash.substring(1));
      }
    },

    termine () {
      this.$emit('terminer');
    }
  },

  methods: {
    reponse (reponse) {
      if(this.carteActive.type !== 'sous-consigne') {
        this.$store.commit('enregistreReponse', reponse);
        this.$journal.enregistre(new EvenementReponse(reponse));
      }
      this.$store.commit('carteSuivante');
    }
  }
};
</script>
