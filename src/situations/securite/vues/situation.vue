<template>
  <scene-securite
    :fond-situation="scene.fondSituation"
    :affiche-aide="scene.afficheAide"
    @terminer="changeEtatSituation"
  />
</template>

<script>
import { mapState } from 'vuex';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from '../store/store';
import SceneSecurite from './scene';
import { zones, dangers, zonesEntrainement, dangersEntrainement } from '../data/zones';

export default {
  components: { SceneSecurite },

  computed: {
    ...mapState(['etat']),

    scene () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return {
          fondSituation: this.depotRessources.fondSituation().src,
          afficheAide: true
        };
      }
      return {
        fondSituation: this.depotRessources.fondSituationEntrainement().src,
        afficheAide: false
      };
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
  },

  methods: {
    changeEtatSituation () {
      if (this.etat === ENTRAINEMENT_DEMARRE) {
        this.$store.commit('modifieEtat', ENTRAINEMENT_FINI);
      } else {
        this.$store.commit('modifieEtat', FINI);
      }
    }
  }
};
</script>
