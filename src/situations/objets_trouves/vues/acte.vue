<template>
  <questions-app
    v-if="afficheQuestionsFin"
    :questions="questionsFin"
    @finQuestions="finDeLaFin"
  />
  <questions-app
    v-else-if="appActive"
    :questions="questionsApp"
    @finQuestions="finApp"
  />
  <app-accueil v-else/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppAccueil from './accueil';
import QuestionsApp from './questions_app';

export default {
  components: { AppAccueil, QuestionsApp },

  computed: {
    ...mapState(['appActive', 'apps', 'appsVisitees', 'questionsFin', 'transitionFinTerminee']),
    ...mapGetters(['nombreApps']),

    questionsApp () {
      return this.apps[this.appActive];
    },

    appsTerminees () {
      return this.appsVisitees.length === this.nombreApps;
    },

    afficheQuestionsFin () {
      return this.transitionFinTerminee;
    },

    situationTerminee () {
      return this.appsTerminees && !!this.questionsFin;
    }
  },

  methods: {
    finApp () {
      this.$store.commit('ajouteAppVisitee', this.appActive);
      this.$store.commit('afficheApp', null);
    },
    finDeLaFin () {
      this.$emit('terminer');
    }
  },

  watch: {
    appsTerminees () {
      if (this.appsTerminees && !this.situationTerminee) {
        this.$emit('terminer');
      }
    }
  }
};
</script>
