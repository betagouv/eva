<template>
  <span :class="{ 'reponse--a-completer': selectionneTrou }">{{valeur}}</span>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    valeur: {
      type: String,
      required: false,
      default: '______'
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

    selectionneTrou() {
      return this.id === this.carteActive.id;
    }
  }
};
</script>
