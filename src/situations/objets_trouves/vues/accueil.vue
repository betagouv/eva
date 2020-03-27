<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <div class="telephone-conteneur">
      <heure />

      <div
        class="ecran-verouille-conteneur"
        v-if='afficheEcranVerrouillage'
      >
        <div class="deverouillage"></div>
        <div class="icones-conteneur">
          <div class="icones">
            <icone-app
              key="deverouillage"
              app="deverouillage"
              :desactivee="appDesactivee('deverouillage')"
              @click.native="afficheApp('deverouillage')"
            />
          </div>
        </div>
      </div>

      <div class="icones-conteneur" v-else>
        <div class="icones">
          <icone-app
            v-for="(question, app) in apps"
            :key="app"
            :apps="apps"
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
        v-html="consigneEcranAccueil"
      >
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import { QUESTIONS_FIN, TRANSITION } from '../modeles/store';
import 'commun/styles/formulaire_qcm.scss';
import 'objets_trouves/styles/acte.scss';
import IconeApp from './icone_app';
import Heure from './heure';

export default {
  components: { Heure, IconeApp },

  computed: {
    ...mapState(['appsVisitees', 'apps', 'consigneEcranAccueil', 'questionsFin', 'etatTelephone', 'afficheEcranVerrouillage']),
    ...mapGetters(['nombreApps']),

    appDesactivee () {
      return (app) => this.appsVisitees.includes(app);
    },
    afficheTransitionFin () {
      return this.etatTelephone === TRANSITION;
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
