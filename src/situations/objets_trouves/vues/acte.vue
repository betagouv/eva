<template>
  <questions-app
    v-if="afficheQuestionFin"
    :questions="questionsFin"
    @finQuestions="finDeLaFin"
  />
  <questions-app
    v-else-if="afficheQuestionApp"
    :questions="questionsAppActive"
    @finQuestions="finApp"
  />
  <app-accueil v-else/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { QUESTIONS_APP, QUESTIONS_FIN, TRANSITION, ACCUEIL } from '../modeles/store';
import AppAccueil from './accueil';
import QuestionsApp from './questions_app';

export default {
  components: { AppAccueil, QuestionsApp },

  computed: {
    ...mapState(['appActive', 'appsVisitees', 'questionsFin', 'etatTelephone']),
    ...mapGetters(['nombreApps', 'questionsAppActive']),

    afficheQuestionFin () {
      return this.etatTelephone === QUESTIONS_FIN;
    },
    afficheQuestionApp () {
      return this.etatTelephone === QUESTIONS_APP;
    },

    appsTerminees () {
      return this.appsVisitees.length === this.nombreApps;
    },
    passeALaTransition () {
      return this.appsTerminees && !!this.questionsFin;
    }
  },

  methods: {
    finApp () {
      this.$store.commit('ajouteAppVisitee', this.appActive);
      this.metAJourEtatTelephone();
    },
    finDeLaFin () {
      this.$emit('terminer');
    },
    metAJourEtatTelephone () {
      if (this.passeALaTransition) {
        this.$store.commit('modifieEtatTelephone', TRANSITION);
      } else {
        this.$store.commit('modifieEtatTelephone', ACCUEIL);
      }
    }
  },

  watch: {
    appsTerminees () {
      if (this.appsTerminees && !this.passeALaTransition) {
        this.finDeLaFin();
      }
    }
  }
};
</script>
