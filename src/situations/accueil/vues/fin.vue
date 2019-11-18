<template>
  <div class="overlay modale">
    <div class="modale-interieur">
      <h2>{{ $traduction('accueil.fin.titre') }}</h2>
      <div class="contenu">
        <p class="message-fin">
        {{ $traduction('accueil.fin.message') }}
        <span
          v-if="this.competencesFortes.length != 0"
          class="message-competences-fortes"
          >{{ $traduction('accueil.fin.competences') }}</span>
        </p>
        <div
          v-for="competence in competencesFortes"
          :key="competence"
          class="competences-fortes"
          >
          <img :src="affichePicto(competence)" />
          <div>
            <p class="competences-fortes-nom">{{ $traduction(`accueil.fin.${competence}.nom`) }}</p>
            <p class="competences-fortes-description">{{ $traduction(`accueil.fin.${competence}.description`) }}
            <a class="competences-fortes-lien" :href="lienSiteVitrine(competence)">{{ $traduction('accueil.fin.en-savoir-plus') }}</a></p>
          </div>
        </div>
      </div>
      <button
        class="bouton-arrondi"
        @click="deconnecte"
      >{{ $traduction('accueil.fin.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import 'commun/styles/fin.scss';

export default {
  computed: mapState(['competencesFortes']),

  methods: {
    ...mapActions(['deconnecte']),

    affichePicto (competence) {
      return this.$depotRessources.pictoCompetences(competence).src;
    },

    lienSiteVitrine (competence) {
      return `https://eva.beta.gouv.fr/competences/${competence}`;
    }
  }
};
</script>
