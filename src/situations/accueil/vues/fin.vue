<template>
  <div
    :class="{ attendre: ! competencesFortesRecus }"
    class="overlay modale"
  >
    <div
      v-if="competencesFortesRecus"
      class="modale-interieur"
    >
      <h2>{{ traduction('accueil.fin.titre') }}</h2>
      <p class="message-fin">
        {{ traduction('accueil.fin.message') }}
        <span
          v-if="this.competencesFortes.length != 0"
          class="message-competences-fortes"
        >{{ traduction('accueil.fin.competences') }}</span>
      </p>
      <p
        v-for="competence in competencesFortes"
        :key="competence"
        class="competences"
      >
        <img :src="affichePicto(competence)" />
        {{ traduction(`accueil.fin.${competence}`) }}
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
import 'commun/styles/fin.scss';

export default {
  data () {
    return {
      competencesFortesRecus: false
    };
  },

  computed: mapState(['competencesFortes']),

  mounted () {
    this.recupereCompetencesFortes();
  },

  methods: {
    ...mapActions(['deconnecte']),

    affichePicto (competence) {
      return this.depotRessources.pictoCompetences(competence).src;
    },

    recupereCompetencesFortes (sync = true) {
      this.$store.dispatch('recupereCompetencesFortes').then(() => {
        this.competencesFortesRecus = true;
      });
    }
  }
};
</script>
