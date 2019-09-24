<template>
  <div
    :style="{ 'background-image': fondSituation }"
    class="fond-situation"
    >
    <svg height="100%" width="100%">
      <circle
        v-for="zone in zones"
        :cx="`${zone.x}%`"
        :cy="`${zone.y}%`"
        :r="`${zone.r}%`"
        :class="{ 'zone-selectionnee': zone === zoneSelectionnee }"
        class="zone"
        @click="selectionneZone(zone)"
      />
    </svg>
    <qualification
      v-if="zoneSelectionnee"
      :zone="zoneSelectionnee"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/situation.scss';
import Qualification from './qualification';

export default {
  components: { Qualification },

  data () {
    return {
      zoneSelectionnee: null,
      fondSituation: `url(${this.depotRessources.fondSituation().src})`
    };
  },

  computed: mapState(['zones']),

  methods: {
    selectionneZone (zone) {
      this.zoneSelectionnee = zone;
    }
  }
}
</script>
