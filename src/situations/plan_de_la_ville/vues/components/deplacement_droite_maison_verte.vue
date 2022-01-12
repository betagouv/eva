<template>
  <fleches-clavier
    @animationDroiteTerminee="deplacementValide"
  />
</template>

<script>

import 'plan_de_la_ville/styles/deplacement_droite_maison_verte.scss';
import FlechesClavier from 'commun/vues/components/fleches_clavier';

export default {
  components: { FlechesClavier },

  methods: {
    deplacementValide () {
      this.$emit('action');
    }
  }
};
</script>
