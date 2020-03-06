<template>
  <qcm
    v-if="afficheQuestionsFin"
    :key="questionFin.id"
    :question="questionFin"
    @reponse="reponseQuestionFin"
  />
  <qcm
    v-else-if="appActive"
    :key="questionApp.id"
    :question="questionApp"
    @reponse="reponseApp"
  />
  <app-accueil v-else />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppAccueil from './accueil';
import Qcm from 'commun/vues/qcm';

export default {
  components: { AppAccueil, Qcm },

  computed: {
    ...mapState(['appActive', 'apps', 'appsVisitees', 'questionsFin', 'indexQuestionsFin']),
    ...mapGetters(['nombreApps']),

    questionApp () {
      return this.apps[this.appActive];
    },

    questionFin () {
      return this.questionsFin[this.indexQuestionsFin];
    },

    afficheQuestionsFin () {
      return this.appsVisitees.length === this.nombreApps && this.questionsFin.length > 0;
    }
  },

  methods: {
    reponseApp () {
      this.$store.commit('ajouteAppVisitee', this.appActive);
      this.$store.commit('afficheApp', null);
    },

    reponseQuestionFin () {
      this.$store.commit('repondQuestionFin');
    }
  }
};
</script>
