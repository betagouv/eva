<template>
  <qcm
    v-if="afficheQuestionsFin && questionFin"
    :key="questionFin.id"
    :question="questionFin"
    @reponse="reponseQuestionFin"
  />
  <questions-app
    v-else-if="appActive"
    :questions="questionsApp"
    @finQuestions="finQuestions"
  />
  <app-accueil v-else/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Qcm from 'commun/vues/qcm';
import AppAccueil from './accueil';
import QuestionsApp from './questions_app';

export default {
  components: { AppAccueil, Qcm, QuestionsApp },

  computed: {
    ...mapState(['appActive', 'apps', 'appsVisitees', 'questionsFin', 'indexQuestionsFin']),
    ...mapGetters(['nombreApps']),

    questionsApp () {
      return this.apps[this.appActive];
    },

    questionFin () {
      return this.questionsFin[this.indexQuestionsFin];
    },

    appsTerminees () {
      return this.appsVisitees.length === this.nombreApps;
    },

    afficheQuestionsFin () {
      return this.appsTerminees && !!this.questionsFin;
    }
  },

  methods: {
    finQuestions () {
      this.$store.commit('ajouteAppVisitee', this.appActive);
      this.$store.commit('afficheApp', null);
    },

    reponseQuestionFin () {
      this.$store.commit('repondQuestionFin');
    }
  },

  watch: {
    indexQuestionsFin () {
      if (this.indexQuestionsFin === this.questionsFin.length) {
        this.$emit('terminer');
      }
    },
    appsTerminees () {
      if (this.appsTerminees && !this.afficheQuestionsFin) {
        this.$emit('terminer');
      }
    }
  }
};
</script>
