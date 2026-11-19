<template>
  <component
    :is="situation.action ? 'button' : 'a'"
    :href="cheminSituation"
    @click="clic"
    :class="{ desactivee: desactivee }"
    :style="{ 'background-image': afficheBatiment ? backgroundImage : null }"
    @dragstart.prevent
  >
    {{ situation.nom }}
  </component>
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

  },

  emits: ['navigue-vers-situation'],

  methods: {
    clic (evenement) {
      if (this.situation.action) {
        this.situation.action(evenement);
        return;
      }
      const ouvreAilleurs = evenement.button !== 0 || evenement.ctrlKey || evenement.metaKey || evenement.shiftKey || evenement.altKey;
      if (!ouvreAilleurs) {
        this.$emit('navigue-vers-situation');
      }
    }
  }
};
</script>
