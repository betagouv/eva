<template>
  <div
    :style="{ 'background-image': `url(${fondSituation})` }"
    class="fond-situation"
    @click="clickSituation"
  >
    <div
      class="compteur-statut"
      @click.stop
    >
      {{ $traduction('securite.dangers_detectes') }}

      <svg
        v-for="nombre in nombreDangersAQualifies"
        :key="nombre"
        :class="{ 'panneau-danger-trouve': nombre <= nombreDangersQualifies }"
        class="panneau-danger"
        width="27"
        height="25"
        viewBox="0 0 27 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.8768 2C15.3372 -0.666667 11.4882 -0.666667 9.94856 2L0.610225 18.1745C-0.929375 20.8411 0.995126 24.1745 4.07433 24.1745H22.751C25.8302 24.1745 27.7547 20.8411 26.2151 18.1745L16.8768 2ZM12.7018 14.2436C12.7409 14.7394 12.9823 14.9873 13.4259 14.9873C13.8564 14.9873 14.0913 14.7394 14.1304 14.2436L14.6784 7.04177C14.7175 6.63732 14.6132 6.2981 14.3653 6.02412C14.1174 5.75013 13.7977 5.61314 13.4063 5.61314C13.0149 5.61314 12.6953 5.75013 12.4474 6.02412C12.2125 6.2981 12.1082 6.63732 12.1343 7.04177L12.7018 14.2436ZM12.4082 19.0188C12.617 19.2145 12.9105 19.3123 13.2889 19.3123H13.5433C13.9217 19.3123 14.2087 19.2145 14.4044 19.0188C14.6132 18.81 14.7175 18.5165 14.7175 18.1381V17.8054C14.7175 17.4271 14.6132 17.14 14.4044 16.9443C14.2087 16.7356 13.9217 16.6312 13.5433 16.6312H13.2889C12.9105 16.6312 12.617 16.7356 12.4082 16.9443C12.2125 17.14 12.1147 17.4271 12.1147 17.8054V18.1381C12.1147 18.5165 12.2125 18.81 12.4082 19.0188Z" />
      </svg>
    </div>
    <fenetre-aide @click.native.stop />
    <svg height="100%" width="100%">
      <circle
        v-for="zone in zones"
        :key="zone.id"
        :cx="`${zone.x}%`"
        :cy="`${zone.y}%`"
        :r="`${zone.r}%`"
        :class="{ 'zone-selectionnee': zone === zoneSelectionnee,
                  'zone-qualifiee': qualification(zone.danger),
                  'zone-aide': aide }"
        class="zone"
        @click.stop="selectionneZone(zone)"
      />
    </svg>
    <fenetre-zone
      v-if="zoneSelectionnee"
      :key="zoneSelectionnee.id"
      :zone="zoneSelectionnee"
      @ferme="deselectionneZone"
     />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'securite/styles/acte.scss';
import { pourcentageX, pourcentageY } from '../data/zones';
import FenetreZone from './fenetre_zone';
import FenetreAide from './fenetre_aide';
import EvenementClickHorsZone from '../modeles/evenement_click_hors_zone';

export default {
  components: { FenetreAide, FenetreZone },

  data () {
    return {
      zoneSelectionnee: null
    };
  },

  computed: {
    ...mapState(['zones', 'dangers', 'dangersQualifies', 'aide', 'fondSituation']),
    ...mapGetters(['qualification', 'nombreDangersQualifies']),

    nombreDangersAQualifies () {
      return Object.keys(this.dangers).length;
    }
  },

  watch: {
    dangersQualifies () {
      if (this.nombreDangersQualifies === this.nombreDangersAQualifies) {
        this.$emit('terminer');
      }
    }
  },

  methods: {
    selectionneZone (zone) {
      if (this.zoneSelectionnee) { return; }
      this.zoneSelectionnee = zone;
    },
    deselectionneZone () {
      this.zoneSelectionnee = null;
    },
    clickSituation (e) {
      if (this.zoneSelectionnee) { return; }
      this.$journal.enregistre(new EvenementClickHorsZone({ x: pourcentageX(e.layerX), y: pourcentageY(e.layerY) }));
    }
  }
};
</script>
