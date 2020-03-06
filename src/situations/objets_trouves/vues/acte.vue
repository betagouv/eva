<template>
  <qcm
    v-if="appActive"
    :question="apps[appActive]"
    @reponse="reponseApp"
  />
  <app-accueil v-else />
</template>

<script>
import { mapState } from 'vuex';
import AppAccueil from './accueil';
import Qcm from 'commun/vues/qcm';

export default {
  components: { AppAccueil, Qcm },

  computed: mapState(['appActive', 'apps']),

  methods: {
    reponseApp () {
      this.$store.commit('ajouteAppVisitee', this.appActive);
      this.$store.commit('afficheApp', null);
    }
  }
};
</script>
