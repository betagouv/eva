<template>
  <div class="question">
    <div
      v-if="afficheIcone"
      class="icone-conteneur"
    >
      <icone-app :app="appActive" :desactivee="false" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'objets_trouves/styles/acte.scss';
import { QUESTIONS_APP } from 'objets_trouves/modeles/store';
import IconeApp from './icone_app';

export default {
  components: { IconeApp },

  computed: {
    ...mapState(['appActive', 'apps', 'etatTelephone']),

    afficheIcone () {
      return this.etatTelephone === QUESTIONS_APP && this.appActive in this.apps;
    }
  }
};
</script>
