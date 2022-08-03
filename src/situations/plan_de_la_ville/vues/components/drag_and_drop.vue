<template>
  <div class="zone-deplacement"
       v-on:mousemove="deplaceSouris"
       v-on:touchmove="deplaceTouche"
    >
    <img
        :src="emplacementEglise"
        class="emplacement-eglise">
    <svg ref="cercleBleu" class="cercle-bleu cercle-bleu--cache" width="222" height="222" viewBox="0 0 222 222" fill="none">
      <circle cx="111" cy="111" r="109.5" fill-opacity="0.8" stroke-width="3"/>
    </svg>
    <img
        :style="positionMaison"
        :src="egliseMaisonAPlacer"
        v-on:mousedown="debuteSelection"
        v-on:touchstart.prevent="debuteTouche"
        v-on:mouseup="termineSelection"
        v-on:touchend="termineSelection"
        v-on:dragstart.prevent=""
        class="eglise-maison-a-placer"
        :class="{ 'eglise-maison-selectionnee' : piece.selectionnee }">
  </div>
</template>

<script>
import 'plan_de_la_ville/styles/drag_and_drop.scss';
import DeplaceurPieces from 'commun/modeles/deplaceur_pieces';
import Piece, { CHANGEMENT_SELECTION } from 'commun/modeles/piece';
import Bac from 'commun/modeles/bac';
import { scene, pourcentageX, pourcentageY } from 'commun/data/scene.js';

export default {
  data () {
    const piece = new Piece({
      x: pourcentageX(480),
      y: pourcentageY(355),
      largeur: pourcentageX(25),
      hauteur: pourcentageY(25)
    });
    const emplacementCible = new Bac({
      x: pourcentageX(134),
      y: pourcentageY(177),
      largeur: pourcentageX(25),
      hauteur: pourcentageY(25)
    });
    piece.on(CHANGEMENT_SELECTION, (selectionnee) => {
      if (!selectionnee) {
        if (emplacementCible.contient(piece)) {
          this.$emit('action');
        }
      }
    });
    const deplaceur = new DeplaceurPieces(scene.largeur, scene.hauteur);
    const egliseMaisonAPlacer = this.$depotRessources.egliseMaisonAPlacer().src;
    const emplacementEglise = this.$depotRessources.emplacementEglise().src;
    return { piece, emplacementCible, deplaceur, egliseMaisonAPlacer, emplacementEglise };
  },

  computed: {
    positionMaison () {
      return {
        left: `${this.piece.x}%`,
        top: `${this.piece.y}%`
      };
    }
  },

  methods: {
    debuteTouche (event) {
      this.debuteSelection(event.changedTouches[0]);
    },

    debuteSelection (event) {
      this.$refs.cercleBleu.classList.replace('cercle-bleu--cache', 'cercle-bleu--visible');
      this.deplaceur.debuteSelection(this.piece, event);
    },

    deplaceTouche (event) {
      this.deplaceSouris(event.changedTouches[0]);
    },

    deplaceSouris (event) {
      this.deplaceur.deplaceSouris(event);
    },

    termineSelection () {
      this.$refs.cercleBleu.classList.replace('cercle-bleu--visible', 'cercle-bleu--cache');
      this.deplaceur.termineSelection();
    }
  }
};
</script>
