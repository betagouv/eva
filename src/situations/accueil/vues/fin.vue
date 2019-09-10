<template>
  <div class="overlay modale">
    <div>
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p>{{ traduction('accueil.fin.message') }}</p>
      <button
        :disabled="enCours"
        class="bouton-arrondi"
        @click="deconnexion"
      >{{ traduction('accueil.fin.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      enCours: false
    };
  },

  methods: {
    ...mapActions(['deconnecte']),

    deconnexion () {
      this.enCours = true;
      this.deconnecte().finally(() => {
        this.enCours = false;
      });
    }
  }
};
</script>
