<template>
  <a
    :href="'/jeu/'+situation.chemin"
    :class="{ desactivee: desactivee }"
    :style="{ 'background-image': afficheBatiment ? backgroundImage : null }"
    v-on="situation.action ? { click: situation.action } : {}"
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
      required: false,
      default: false
    },
    afficheFond: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    afficheBatiment () {
      return this.afficheFond && this.$depotRessources.existeBatimentSituation(this.situation.identifiant);
    },

    backgroundImage () {
      return `url('${this.$depotRessources.batimentSituation(this.situation.identifiant).src}')`;
    }
  }
};
</script>
