<template>
  <div>
    <img :src="$depotRessources.personnage().src" :class="{ 'deplacement-droite': deplace, 'mauvais-deplacement': vacille  }" class="personnage" />
    <choix-bidirectionnel
      @animationDroiteTerminee="deplacementValide"
      @actionDroite="deplacePersonnage()"
      @actionGauche="vacillePersonnage()"
      :dureeAnimation="1000"
    />
  </div>
</template>

<script>

import 'plan_de_la_ville/styles/deplacement_droite_maison_verte.scss';
import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

export default {
  components: { ChoixBidirectionnel },

  data () {
    return {
      deplace: false,
      vacille: false
    };
  },

  methods: {
    deplacementValide () {
      this.$emit('action');
    },

    deplacePersonnage () {
      this.deplace = true;
    },

    vacillePersonnage () {
      this.vacille = true;
      setTimeout(() => { this.vacille = false; }, 800);
    }
  }
};
</script>
