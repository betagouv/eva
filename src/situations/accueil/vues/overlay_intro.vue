<template>
  <div class="overlay modale">
    <div
      v-if="ecran == 'consigne'"
      class="modale-interieur"
    >
      <h2>{{ traduction('accueil.intro_consigne.titre') }}</h2>
      <p class="icone-description">
        <img
          :src="casque"
          class="icone-description-icone"
        >
        <span>{{ traduction('accueil.intro_consigne.message') }}</span>
      </p>
      <button
        class="bouton-arrondi"
        @click="afficheContexte"
      >{{ traduction('accueil.intro_consigne.bouton') }}</button>
    </div>
    <div
      v-else
      class="modale-interieur"
    >
      <div
        v-html="traduction('accueil.intro_contexte.message')"
       ></div>
      <button
        class="bouton-arrondi"
        @click="passe"
      >{{ traduction('accueil.intro_contexte.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import 'commun/styles/modale.scss';

export default {
  data () {
    return {
      ecran: 'consigne',
      casque: this.depotRessources.casque().src
    };
  },

  methods: {
    afficheContexte () {
      this.ecran = 'contexte';
    },

    passe () {
      this.$emit('passe');
    }
  }
};
</script>
