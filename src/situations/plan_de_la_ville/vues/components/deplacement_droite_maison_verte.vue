<template>
  <Keypress key-event="keydown" :key-code="39" @success="deplacementValide" />
</template>

<script>

import Keypress from 'vue-keypress';

export default {
  components: { Keypress },

  data () {
    return {
      termine: false
    };
  },

  methods: {
    deplacementValide () {
      if (this.termine === false) {
        this.$emit('action');
        this.termine = true;
      }
    }
  }
};
</script>
