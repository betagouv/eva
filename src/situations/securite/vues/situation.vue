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
        :class="{ 'zone-selectionnee': zone === zoneSelectionnee,
                  'zone-qualifiee': dangersQualifies.includes(zone.danger) }"
        class="zone"
        @click="selectionneZone(zone)"
      />
    </svg>
    <fenetre-zone
      v-if="zoneSelectionnee"
      :key="`${zoneSelectionnee.x}${zoneSelectionnee.y}`"
      :zone="zoneSelectionnee"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/situation.scss';
import { FINI } from '../store/store';
import FenetreZone from './fenetre_zone';

export default {
  components: { FenetreZone },

  data () {
    return {
      zoneSelectionnee: null,
      fondSituation: `url(${this.depotRessources.fondSituation().src})`
    };
  },

  computed: mapState(['zones', 'dangers', 'dangersQualifies']),

  watch: {
    dangersQualifies () {
      if (this.dangersQualifies.length === Object.keys(this.dangers).length) {
        this.$store.commit('modifieEtat', FINI);
      }
    }
  },

  methods: {
    selectionneZone (zone) {
      this.zoneSelectionnee = zone;
    }
  }
}
</script>
