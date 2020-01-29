<template>
  <div
    :style="{ 'background-image': `url(${fondSituation})` }"
    class="fond-situation"
  >
    <lexique
      v-if="afficheLexique"
      :lexique="lexique"
      @terminer="$emit('terminer')"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lexique from './lexique';
import { ENTRAINEMENT_DEMARRE, DEMARRE } from '../modeles/store';
import 'maintenance/styles/acte.scss';

export default {
  components: { Lexique },
  computed: {
    ...mapState(['lexique', 'etat', 'fondSituation']),
    afficheLexique () {
      return [ENTRAINEMENT_DEMARRE, DEMARRE].includes(this.etat);
    }
  }
};
</script>
