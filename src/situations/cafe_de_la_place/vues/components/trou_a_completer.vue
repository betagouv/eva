<template>
  <span :class="classCss">{{valeur}}</span>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    idQuestion: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(['carteActive']),
    ...mapGetters(['reponse']),

    trouEnCours() {
      return this.idQuestion === this.carteActive.id;
    },

    valeur() {
      return this.reponseEnAttente ? '______' : this.reponse(this.idQuestion).reponse;
    },

    reponseEnAttente() {
      return !this.reponse(this.idQuestion);
    },

    classCss() {
      let classes = [];
      if (this.trouEnCours) { classes.push('reponse--en-cours'); }
      classes.push(this.reponseEnAttente ? 'reponse--en-attente' : 'reponse--completee');

      return classes.join(' ');
    }
  },
};
</script>
