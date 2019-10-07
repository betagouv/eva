<template>
  <div
    :style="{ 'background-image': fondSituation }"
    class="fond-situation"
  >
    <div class="compteur-statut">
      {{ traduction('securite.dangers_detectes') }}: {{nombreDangersQualifies}}/{{nombreDangersAQualifies}}
      <bouton-aide />
    </div>
    <svg height="100%" width="100%">
      <circle
        v-for="zone in zones"
        :key="`${zone.x}-${zone.y}`"
        :cx="`${zone.x}%`"
        :cy="`${zone.y}%`"
        :r="`${zone.r}%`"
        :class="{ 'zone-selectionnee': zone === zoneSelectionnee,
                  'zone-qualifiee': qualification(zone.danger),
                  'zone-aide': aide }"
        class="zone"
        @click="selectionneZone(zone)"
      />
    </svg>
    <fenetre-zone
      v-if="zoneSelectionnee"
      :key="`${zoneSelectionnee.x}${zoneSelectionnee.y}`"
      :zone="zoneSelectionnee"
      @ferme="deselectionneZone"
     />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'securite/styles/situation.scss';
import { FINI } from '../store/store';
import BoutonAide from './bouton_aide';
import FenetreZone from './fenetre_zone';

export default {
  components: { BoutonAide, FenetreZone },

  data () {
    return {
      zoneSelectionnee: null,
      fondSituation: `url(${this.depotRessources.fondSituation().src})`
    };
  },

  computed: {
    ...mapState(['zones', 'dangers', 'dangersQualifies', 'aide']),
    ...mapGetters(['qualification', 'nombreDangersQualifies']),

    nombreDangersAQualifies () {
      return Object.keys(this.dangers).length;
    }
  },

  watch: {
    dangersQualifies () {
      if (this.nombreDangersQualifies === this.nombreDangersAQualifies) {
        this.$store.commit('modifieEtat', FINI);
      }
    }
  },

  methods: {
    selectionneZone (zone) {
      this.zoneSelectionnee = zone;
    },
    deselectionneZone () {
      this.zoneSelectionnee = null;
    }
  }
};
</script>
