<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <lexique
      v-if="situationDemarre"
      :lexique="lexique"
      @terminer="$emit('terminer')"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lexique from './lexique';
import { DEMARRE } from '../modeles/store';
import 'maintenance/styles/acte.scss';

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
