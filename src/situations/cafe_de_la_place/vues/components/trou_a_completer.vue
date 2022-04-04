<template>
  <span :class="{ 'reponse--a-completer': selectionneTrou }">______</span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true
    },
  },

  computed: {
    ...mapState(['carteActive']),

    selectionneTrou() {
      return this.id === this.carteActive.id;
    }
  }
};
</script>
