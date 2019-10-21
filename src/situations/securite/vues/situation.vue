<template>
  <acte-securite @terminer="changeEtatSituation" />
</template>

<script>
import { mapState } from 'vuex';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from '../store/store';
import ActeSecurite from './acte';
import { zones, dangers, zonesEntrainement, dangersEntrainement } from '../data/zones';

export default {
  components: { ActeSecurite },

  computed: {
    ...mapState(['etat']),

    scene () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return {
          fondSituation: this.depotRessources.fondSituation().src,
          afficheAide: true,
          zones,
          dangers
        };
      }
      return {
        fondSituation: this.depotRessources.fondSituationEntrainement().src,
        afficheAide: false,
        zones: zonesEntrainement,
        dangers: dangersEntrainement
      };
    }
  },

  mounted () {
    this.$store.commit('configureActe', this.scene);
  },

  watch: {
    etat (nouvelEtat) {
      if (nouvelEtat === DEMARRE) {
        this.$store.commit('configureActe', this.scene);
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
