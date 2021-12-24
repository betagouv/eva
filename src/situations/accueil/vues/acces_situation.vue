<template>
  <a
    :href="cheminSituation"
    :class="{ desactivee: desactivee }"
    :style="{ 'background-image': afficheBatiment ? backgroundImage : null }"
    v-on="situation.action ? { click: situation.action } : {}"
    @dragstart.prevent
  >
    {{ situation.nom }}
  </a>
</template>

<script>
import * as path from 'path';
import 'accueil/styles/acces_situation.scss';
import { SCOPE_URL } from 'commun/vues/affiche_situation';

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
    },

    cheminSituation () {
      if (!this.situation.chemin) return;

      return path.join(SCOPE_URL, this.situation.chemin);
    }

  }
};
</script>
