<template>
  <div class="overlay modale">
    <div>
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p>{{ traduction('accueil.fin.message') }}</p>
      <button
        class="bouton-arrondi"
        @click="deconnecte"
      >{{ traduction('accueil.fin.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  methods: {
    ...mapActions(['deconnecte']),
  }
};
</script>
