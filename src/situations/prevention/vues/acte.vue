<template>
  <div
    :style="{ 'background-image': `url(${fondSituation})` }"
    class="fond-situation"
  >
    <svg height="100%" width="100%">
      <circle
        v-for="zone in zones"
        :key="zone.id"
        :cx="`${zone.x}%`"
        :cy="`${zone.y}%`"
        :r="`${zone.r}%`"
        class="zone zone-selectionnee"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/acte.scss';

export default {
  computed: {
    ...mapState(['fondSituation', 'zones'])
  }
};
</script>
