<template>
  <div class="overlay modale centrage-horizontal">
    <div
      v-if="ecran == 'bravo'"
      class="modale-interieur bravo">
      <img class="avatar-fin" :src="avatarFin"/>
      <div>
        <h2 v-html="$traduction('accueil.fin.bravo.titre', { nom: nom })"></h2>
        <div v-if="this.evaluationTerminee && this.competencesFortes.length != 0">
          <div class="contenu">
            <p class="message-fin">
            {{ $traduction('accueil.fin.bravo.message') }}
            </p>
          </div>
          <button
            class="bouton-arrondi"
            @click="suivant"
            >{{ $traduction('accueil.fin.bravo.bouton') }}</button>
        </div>
        <bouton-deconnexion v-else-if="this.evaluationTerminee"
          :deconnexion-directe=true />
      </div>
    </div>
    <div
      v-else
      class="modale-interieur resultat">
      <h2>{{ $traduction('accueil.fin.resultat.titre') }}</h2>
      <div
        class="message-competences-fortes"
        v-html="$traduction('accueil.fin.resultat.competences')">
      </div>
      <div class="contenu">
        <div
          v-for="competence in competencesFortes"
          :key="competence.id"
          class="competences-fortes"
          >
          <img :src="competence.picto" />
          <p class="competences-fortes-nom">{{ competence.nom }}</p>
          <p class="competences-fortes-description">{{ competence.description }}</p>
        </div>
      </div>
      <div class="contenu">
        <div
          v-for="competence in competencesFortes"
          :key="competence.id"
          >
            <a target="_blank" class="bouton-arrondi bouton-arrondi--petit" :href="lienSiteVitrine(competence.id)">{{ $traduction('accueil.fin.resultat.en-savoir-plus') }}</a>
        </div>
      </div>

      <bouton-deconnexion/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/fin.scss';
import BoutonDeconnexion from 'accueil/vues/bouton_deconnexion';

export default {
  components: { BoutonDeconnexion },
  computed: mapState(['competencesFortes', 'evaluationTerminee', 'nom']),

  data () {
    return {
      ecran: 'bravo',
      avatarFin: this.$depotRessources.avatarFin().src
    };
  },

  mounted () {
    this.termineEvaluation();
  },

  methods: {
    lienSiteVitrine (competence) {
      return `https://eva.beta.gouv.fr/competences/${competence}`;
    },

    suivant () {
      this.ecran = 'resultat';
    },

    termineEvaluation () {
      this.$store.dispatch('termineEvaluation');
    }
  }
};
</script>
