<template>
  <component
    :is="composantActe"
    @terminer="termineActe"
  ></component>
</template>

<script>
import { mapState } from 'vuex';
import { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE, FINI } from '../modeles/situation';

export default {
  props: {
    composantActe: {
      type: Object,
      required: true
    },
    configurationNormale: {
      type: Object,
      required: true
    },
    configurationEntrainement: {
      type: Object,
      required: false
    }
  },

  computed: {
    ...mapState(['etat']),

    acte () {
      if (!this.configurationEntrainement || [DEMARRE, FINI].includes(this.etat)) {
        return {
          fondSituation: this.$depotRessources.fondSituation().src,
          ...this.configurationNormale
        };
      }
      return {
        fondSituation: this.$depotRessources.fondSituationEntrainement().src,
        ...this.configurationEntrainement
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
    termineActe () {
      if(this.etat == ENTRAINEMENT_FINI) return;

      if (this.etat === ENTRAINEMENT_DEMARRE) {
        this.$store.commit('modifieEtat', ENTRAINEMENT_FINI);
      } else {
        this.$store.commit('modifieEtat', FINI);
      }
    }
  }
};
</script>
