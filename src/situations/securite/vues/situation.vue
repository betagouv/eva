<template>
  <acte-securite @terminer="changeEtatSituation" />
</template>

<script>
import { mapState } from 'vuex';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from '../store/store';
import ActeSecurite from './acte';
import { configurationEntrainement, configurationNormale } from '../data/zones';

export default {
  components: { ActeSecurite },

  computed: {
    ...mapState(['etat']),

    acte () {
      if ([DEMARRE, FINI].includes(this.etat)) {
        return {
          fondSituation: this.depotRessources.fondSituation().src,
          afficheAide: true,
          ...configurationNormale
        };
      }
      return {
        fondSituation: this.depotRessources.fondSituationEntrainement().src,
        afficheAide: false,
        ...configurationEntrainement
      };
    }
  },

  mounted () {
    this.$store.commit('configureActe', this.acte);
  },

  watch: {
    etat (nouvelEtat) {
      if (nouvelEtat === DEMARRE) {
        this.$store.commit('configureActe', this.acte);
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
