<template>
  <qcm
    v-if="appActive"
    :question="{}"
  />
  <app-accueil v-else />
</template>

<script>
import { mapState } from 'vuex';
import AppAccueil from './accueil';
import Qcm from 'commun/vues/qcm';

export default {
  components: { AppAccueil, Qcm },

  computed: mapState(['appActive'])
};
</script>
