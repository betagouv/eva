<template>
  <div
    :style="{ 'background-image': fondSituation }"
    class="fond-situation"
    @click="clickSituation"
  >
    <div
      class="compteur-statut"
      @click.stop
    >
      {{ traduction('securite.dangers_detectes') }}: {{nombreDangersQualifies}}/{{nombreDangersAQualifies}}
      <bouton-aide />
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
      @click.native.stop
     />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'securite/styles/situation.scss';
import { FINI } from '../store/store';
import { pourcentageX, pourcentageY } from '../data/zones';
import BoutonAide from './bouton_aide';
import FenetreZone from './fenetre_zone';
import FenetreAide from './fenetre_aide';
import EvenementClickHorsZone from '../modeles/evenement_click_hors_zone';

export default {
  components: { BoutonAide, FenetreAide, FenetreZone },

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
    },
    clickSituation (e) {
      this.journal.enregistre(new EvenementClickHorsZone({ x: pourcentageX(e.layerX), y: pourcentageY(e.layerY) }));
    }
  }
};
</script>
