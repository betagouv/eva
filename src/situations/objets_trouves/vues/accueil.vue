<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <div class="telephone-conteneur telephone-conteneur--fond">
      <heure />

      <div
        v-if="afficheEcranVerrouille"
        class="ecran-verrouille-conteneur"
      >
        <div class="icones-conteneur icones-conteneur--deverrouiller">
          <div class="icones">
            <icone-app
              key="deverrouillage"
              app="deverrouillage"
              :desactivee="appDesactivee('deverrouillage')"
              @click.native="afficheApp('deverrouillage')"
            />
          </div>
        </div>
      </div>

      <div
        v-else
        class="icones-conteneur"
      >
        <div class="icones">
          <icone-app
            v-for="(question, app) in apps"
            :key="app"
            :app="app"
            :desactivee="appDesactivee(app)"
            @click.native="afficheApp(app)"
          />
        </div>
      </div>

    </div>
    <div class="question">
      <div
        v-if="afficheTransitionFin"
        class="question-barre transition"
      >
        <div v-html="$traduction('objets_trouves.intro_contexte.message_transition_fin')" >
        </div>
        <button
          class="bouton-arrondi bouton-arrondi--petit"
          @click="afficheQuestionsFin"
        >
          {{ $traduction('objets_trouves.intro_contexte.suivant') }}
        </button>
      </div>
      <div
        v-else
        class="question-barre accueil"
        v-html="consigneEcranAccueil()"
      >
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import { QUESTIONS_FIN, TRANSITION, ACCUEIL_VERROUILLE } from '../modeles/store';
import 'commun/styles/formulaire_qcm.scss';
import 'objets_trouves/styles/acte.scss';
import IconeApp from './icone_app';
import Heure from './heure';

export default {
  components: { Heure, IconeApp },

  computed: {
    ...mapState(['appsVisitees', 'apps', 'questionsFin', 'etatTelephone']),
    ...mapGetters(['consigneEcranAccueil']),

    appDesactivee () {
      return (app) => this.appsVisitees.includes(app);
    },
    afficheTransitionFin () {
      return this.etatTelephone === TRANSITION;
    },
    afficheEcranVerrouille () {
      return this.etatTelephone === ACCUEIL_VERROUILLE;
    }
  },

  methods: {
    ...mapMutations(['afficheApp']),
    afficheQuestionsFin () {
      this.$store.commit('modifieEtatTelephone', QUESTIONS_FIN);
    }
  }
};
</script>
