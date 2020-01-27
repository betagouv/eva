<template>
  <lexique
  v-if="situationDemarre()"
  :lexique="lexique"
  />
</template>

<script>
import { mapState } from 'vuex';
import Lexique from './lexique';
import { DEMARRE } from '../modeles/situation';

export default {
  components: { Lexique },
  computed: mapState(['lexique', 'etat']),
  methods: {
    situationDemarre() {
      return this.etat == 'démarré'
    }
  }
}
</script>
