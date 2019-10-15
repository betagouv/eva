<template>
  <scene-securite
    :fond-situation="fondSituation"
  />
</template>

<script>
import { mapState } from 'vuex';
import { DEMARRE, FINI } from '../store/store';
import SceneSecurite from './scene';

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
  }
};
</script>
