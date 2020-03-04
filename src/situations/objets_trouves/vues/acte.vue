<template>
  <qcm
    v-if="appActive"
    :question="question"
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

  data () {
    return {
      question: {
        choix: [
          {
            id: '1',
            intitule: '1'
          }
        ]
      }
    };
  },

  computed: mapState(['appActive']),

  methods: {
    reponseApp () {
      this.$store.commit('afficheAppli', null);
    }
  }
};
</script>
