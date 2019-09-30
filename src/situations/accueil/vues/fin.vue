<template>
  <div class="overlay modale">
    <div class= "modale-interieur">
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p class="message-base">{{ traduction('accueil.fin.message') }}</p>
      <div class='competences-fortes-conteneur' v-if="this.competencesFortes.length != 0" >
        <p class="message-competence">{{ traduction('accueil.fin.competences') }}</p>
        <li class="competences" v-for="(competence, index) in competencesFortes">
          {{ traduction(`accueil.fin.${Object.keys(competence).join()}`) }}
        </li>
      </div>
      <button
        class="bouton-arrondi"
        @click="deconnecte"
      >{{ traduction('accueil.fin.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import "commun/styles/fin.scss";

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
