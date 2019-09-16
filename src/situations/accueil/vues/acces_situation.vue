<template>
  <a
    :href="situation.chemin"
    :class="{ desactivee: desactivee }"
    :style="{ 'background-image': backgroundImage }"
    class="acces-situation"
    @click="situation.action"
    @dragstart.prevent
  >
    {{ situation.nom }}
  </a>
</template>

<script>
import 'accueil/styles/acces_situation.scss';

export default {
  props: {
    situation: {
      type: Object,
      required: true
    },
    desactivee: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      backgroundImage: `url('${this.depotRessources.batimentSituation(this.situation.identifiant).src}')`
    };
  }
}
</script>
