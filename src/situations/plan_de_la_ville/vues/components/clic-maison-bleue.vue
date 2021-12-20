<template>
  <div id='maison-bleue' v-on:click="clicValide"></div>
</template>

<script>
import 'plan_de_la_ville/styles/clic-maison-bleue.scss';

export default {
  methods: {
    clicValide: function (event) {
      this.$emit('action');
    }
  }
};
</script>
