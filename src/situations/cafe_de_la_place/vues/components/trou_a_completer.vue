<template>
  <span :class="{ 'reponse--a-completer': selectionneTrou }">{{valeur}}</span>
</template>

<script>
import { mapState } from 'vuex';

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

    selectionneTrou() {
      return this.id === this.carteActive.id;
    }
  }
};
</script>
