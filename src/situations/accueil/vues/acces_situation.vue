<template>
  <a
    :href="situation.chemin"
    :class="[situation.identifiant, { desactivee: desactivee }]"
    :style="{ 'background-image': backgroundImage }"
    class="acces-situation"
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
    }
  },

  data() {
    return {
      backgroundImage: `url('${this.depotRessources.batimentSituation(this.situation.identifiant).src}')`
    };
  },

  computed: {
    desactivee() {
      return this.situation.niveauMinimum > this.$store.getters.niveauActuel;
    }
  }
}
</script>
