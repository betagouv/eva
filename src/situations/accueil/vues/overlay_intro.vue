<template>
  <div class="overlay modale">
    <div>
      <h2>{{ traduction('accueil.intro.titre') }}</h2>
      <p>{{ traduction('accueil.intro.message') }}</p>
      <button
        class="bouton-arrondi"
        @click="passe"
      >{{ traduction('accueil.intro.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    passe () {
      this.$emit('passe');
    }
  }
};
</script>
