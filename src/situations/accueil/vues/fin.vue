<template>
  <div class="overlay modale centrage-horizontal">
    <div
      v-if="ecran == 'bravo'"
      class="modale-interieur bravo">
      <img class="avatar-fin" :src="avatarFin"/>
      <div>
        <h2 v-html="$traduction('accueil.fin.bravo.titre', { nom: nom })"></h2>
        <div v-if="this.competencesFortes.length != 0">
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

      <div class='actions-fin'>
        <transition-fade>
          <div class='mon-avis'
            v-if="afficheDonnerAvis"
          >
            <div class='information-avis'>
              <img class="avatar-avis" :src="avatarAvis"/>
              <span v-html="$traduction('accueil.fin.avis.label')" />
            </div>
            <div class='actions-avis'>
              <a class="bouton-arrondi bouton-arrondi--petit bouton-arrondi-vert"
                :href="lienDonnerAvis"
                target='_blank'
                @click="fermeDonnerAvis">
                {{ $traduction('accueil.fin.avis.oui') }}
              </a>
              <a class="bouton-arrondi bouton-arrondi--petit bouton-arrondi-orange"
                 @click="fermeDonnerAvis"
              >
                {{ $traduction('accueil.fin.avis.non') }}
              </a>
            </div>
          </div>
        </transition-fade>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/fin.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },
  computed: mapState(['competencesFortes', 'nom']),

  data () {
    return {
      ecran: 'bravo',
      avatarFin: this.$depotRessources.avatarFin().src,
      avatarAvis: this.$depotRessources.avatarAvis().src,
      lienDonnerAvis: 'https://evabetagouv.typeform.com/to/G988nO',
      afficheDonnerAvis: true
    };
  },

  methods: {
    lienSiteVitrine (competence) {
      return `https://eva.beta.gouv.fr/competences/${competence}`;
    },

    suivant () {
      this.ecran = 'resultat';
    },

    fermeDonnerAvis () {
      this.afficheDonnerAvis = false;
    }
  }
};
</script>
