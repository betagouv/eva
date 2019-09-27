<template>
  <div class="overlay modale">
    <div class= "modale-interieur">
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p>{{ traduction('accueil.fin.message') }}</p>
      <p>{{ traduction('accueil.fin.competences_fortes') }}</p>
      <li v-for="(competence, index) in competencesFortes">
        {{ traduction(`accueil.fin.${Object.keys(competence).join()}`) }}
      </li>
      <button
        class="bouton-arrondi"
        @click="deconnecte"
      >{{ traduction('accueil.fin.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['competencesFortes']),
  },

  mounted () {
    this.recupereCompetencesFortes();
  },

  methods: {
    ...mapActions(['deconnecte']),

    recupereCompetencesFortes (sync = true) {
      this.$store.dispatch('recupereCompetencesFortes');
      }
    }
};
</script>
