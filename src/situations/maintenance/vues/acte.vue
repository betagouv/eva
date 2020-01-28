<template>
  <lexique
    v-if="situationDemarre"
    :lexique="lexique"
  />
</template>

<script>
import { mapState } from 'vuex';
import Lexique from './lexique';
import { DEMARRE } from '../modeles/store';

export default {
  components: { Lexique },
  computed: {
    ...mapState(['lexique', 'etat']),
    situationDemarre () {
      return this.etat === DEMARRE;
    }
  }
};
</script>
