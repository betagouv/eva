<template>
  <div class="overlay modale"
       :class="{ attendre: ! competencesFortesRecus }">
    <div v-if="competencesFortesRecus" class= "modale-interieur">
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p class="message-fin">{{ traduction('accueil.fin.message') }}
        <span v-if="this.competencesFortes.length != 0" class="message-competences-fortes">{{ traduction('accueil.fin.competences') }}</span>
      </p>
      <p class="competences" v-for="(competence, index) in competencesFortes">
        <img
          :src="affichePicto(competence)"
        />
        {{ traduction(`accueil.fin.${formatteCompetence(competence)}`) }}
      </p>
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
  data () {
    return {
      competencesFortesRecus: false
    };
  },

  computed: {
    ...mapState(['competencesFortes']),
  },

  mounted () {
    this.recupereCompetencesFortes();
  },

  methods: {
    ...mapActions(['deconnecte']),

    formatteCompetence (competence) {
      return Object.keys(competence)[0]
    },

    affichePicto (competence) {
      const competencesFortes = this.formatteCompetence(competence)
      return this.depotRessources.pictoCompetences(competencesFortes).src;
    },

    recupereCompetencesFortes (sync = true) {
      this.$store.dispatch('recupereCompetencesFortes').then(() => {
        this.competencesFortesRecus = true;
      });
    }
  }
};
</script>
