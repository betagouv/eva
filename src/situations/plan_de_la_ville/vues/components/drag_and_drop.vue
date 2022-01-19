<template>
  <div class="zone-deplacement"
       v-on:mousemove="deplaceSouris"
    >
    <img
      :style="positionMaison"
      :src="egliseMaisonAPlacer"
      v-on:mousedown="debuteSelection"
      v-on:mouseup="termineSelection"
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
    return { piece, emplacementCible, deplaceur, egliseMaisonAPlacer };
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
    debuteSelection: function (event) {
      this.deplaceur.debuteSelection(this.piece, event);
    },

    deplaceSouris (e) {
      this.deplaceur.deplaceSouris(e);
    },

    termineSelection: function (event) {
      this.deplaceur.termineSelection();
    }
  }
};
</script>
