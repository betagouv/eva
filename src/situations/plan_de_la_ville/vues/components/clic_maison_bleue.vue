<template>
  <div id='maison-bleue' v-on:click="clicValide"></div>
</template>

<script>
import 'plan_de_la_ville/styles/clic_maison_bleue.scss';

export default {
  methods: {
    clicValide: function () {
      this.$emit('action');
    }
  }
};
</script>
