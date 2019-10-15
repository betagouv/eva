<template>
  <scene-securite
    :fond-situation="fondSituation"
  />
</template>

<script>
import { mapState } from 'vuex';
import { DEMARRE, FINI } from '../store/store';
import SceneSecurite from './scene';
import { zones, dangers, zonesEntrainement, dangersEntrainement } from '../data/zones';

export default {
  components: { SceneSecurite },

  computed: {
    ...mapState(['etat']),

    fondSituation () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return this.depotRessources.fondSituation().src;
      }
      return this.depotRessources.fondSituationEntrainement().src;
    }
  },

  mounted () {
    this.$store.commit('chargeZonesEtDangers', {
      zones: zonesEntrainement,
      dangers: dangersEntrainement
    });
  },

  watch: {
    etat (nouvelEtat) {
      if (nouvelEtat === DEMARRE) {
        this.$store.commit('chargeZonesEtDangers', { zones, dangers });
      }
    }
  }
};
</script>
