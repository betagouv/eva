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
      <div class="contenu-resultat">
        <svg
            width="32"
            height="32"
            class="indicateur-audio"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <circle cx="16" cy="16" r="16" fill="#1E416A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.903H8a1 1 0 0 1-1-1v-5.04a1 1 0 0 1 1-1h1.764a1 1 0 0 0 .447-.105l3.621-1.81a1 1 0 0 1 1.447.894v9.083a1 1 0 0 1-1.447.894L10 19.903Z" fill="#FBF9FA"/><path d="M23.48 10c.514.817.92 1.853 1.182 3.023.262 1.17.375 2.44.328 3.709-.047 1.268-.252 2.496-.598 3.586-.345 1.09-.823 2.008-1.392 2.682M19.48 12c.514.566.92 1.283 1.182 2.093.262.81.375 1.69.328 2.567a6.86 6.86 0 0 1-.598 2.483c-.345.754-.823 1.39-1.392 1.857" stroke="#FBF9FA" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h2>{{ $traduction('accueil.fin.resultat.titre') }}</h2>
        <div class="message-competences-fortes">
          <BoutonLectureAvecDepotRessources
            class="bouton-lecture"
            nomTechnique='introduction'
          />
          <p v-html="$traduction('accueil.fin.resultat.competences')"></p>
        </div>
        <div class="contenu-competences-fortes">
          <div
            v-for="competence in competencesFortes"
            :key="competence.nom_technique"
            class="competences-fortes"
            >
            <BoutonLectureAvecDepotRessources
              class="bouton-lecture"
              :nomTechnique="competence.nom_technique"
            />
            <div class="competences-fortes-informations">
              <p class="competences-fortes-nom">{{ competence.nom }}</p>
              <p class="competences-fortes-description">{{ competence.description }}</p>
              <a target="_blank" class="competences-fortes-lien bouton-arrondi bouton-arrondi--petit" :href="lienSiteVitrine(competence.nom_technique)">{{ $traduction('accueil.fin.resultat.en-savoir-plus') }}</a>
            </div>
            <img :src="competence.picto" />
          </div>
        </div>
      </div>
      <bouton-deconnexion/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/fin.scss';
import 'commun/styles/boutons.scss';
import BoutonDeconnexion from 'accueil/vues/bouton_deconnexion';
import BoutonLectureAvecDepotRessources from 'commun/vues/bouton_lecture_avec_depot_ressources';

export default {
  components: { BoutonDeconnexion, BoutonLectureAvecDepotRessources },
  computed: mapState(['competencesFortes', 'evaluationTerminee', 'nom']),

  data () {
    return {
      ecran: 'bravo',
      avatarFin: this.$depotRessources.avatarFin().src
    };
  },

  methods: {
    lienSiteVitrine (competence) {
      return `https://eva.beta.gouv.fr/competences/${competence}`;
    },

    suivant () {
      this.ecran = 'resultat';
    },
  }
};
</script>
