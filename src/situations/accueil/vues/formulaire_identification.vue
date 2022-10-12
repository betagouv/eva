<template>
  <transition-fade>
    <form
      v-if="!estConnecte"
      class="overlay modale modale-formulaire"
      @submit.prevent="envoieFormulaire">
      <div>
        <h2 class="formulaire-identification-titre">{{ $traduction('accueil.identification.titre') }}</h2>
        <div
            v-if="erreurFormulaireIdentification.generale"
            class="erreur-generale">{{ erreurFormulaireIdentification.generale }}</div>
        <div class="elements-formulaire">
          <div>
            <label
              v-if="!nomForce"
              for="formulaire-identification-champ-nom">
              {{ $traduction('accueil.identification.label') }}
            </label>
            <div
              class="element-formulaire"
              v-if="!nomForce">
              <input
                id="formulaire-identification-champ-nom"
                v-model.trim="nom"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                autofocus>
              <span
                v-if="erreurFormulaireIdentification.nom"
                class="erreur-message">{{ erreurFormulaireIdentification.nom }}</span>
            </div>
          </div>
          <div>
            <label
              for="formulaire-identification-champ-campagne">
              {{ $traduction('accueil.identification.campagne') }}
            </label>
            <div
              class="element-formulaire">
              <input
                id="formulaire-identification-champ-campagne"
                v-model.trim="campagne"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                :disabled="champCodeEstDesactive"
                :class="{ 'erreur-champ': erreurFormulaireIdentification.code }"
                @focusout="forceMajuscule">
              <div
                v-if="erreurFormulaireIdentification.code"
                class="erreur-message">{{ erreurFormulaireIdentification.code }}</div>
            </div>
          </div>
        </div>
        <label class="cgu-label">
          <input v-model="cgu" type="checkbox" />
          <span class="cgu-text" v-html="$traduction('accueil.identification.cgu')"></span>
        </label>
        <div class="element-formulaire">
          <button
            :disabled="estDesactive"
            class="bouton-arrondi">{{ $traduction('accueil.identification.bouton') }}</button>
        </div>
      </div>
    </form>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/formulaire.scss';
import 'commun/styles/champ.scss';
import 'commun/styles/boutons.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },

  props: {
    forceCampagne: {
      type: String,
      required: false,
      default: ''
    },

    forceNom: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      nom: this.forceNom,
      campagne: this.forceCampagne.toUpperCase(),
      enCours: false,
      cgu: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'erreurFormulaireIdentification']),

    estDesactive () {
      return this.nom === '' || this.campagne === '' || !this.cgu || this.enCours;
    },

    campagneForcee () {
      return this.forceCampagne !== '';
    },

    nomForce () {
      return this.forceNom !== '';
    },

    champCodeEstDesactive () {
      if (this.erreurFormulaireIdentification) { return false; }
      if (this.campagneForcee) { return true; }
      return false;
    }
  },

  methods: {
    envoieFormulaire () {
      this.enCours = true;

      return this.$store.dispatch('recupereCampagne', {
        codeCampagne: this.campagne
      })
        .then((campagne) => {
          if (campagne) {
            return this.envoieFormulaireInscription();
          }
        })
        .finally(() => {
          this.enCours = false;
        });
    },

    envoieFormulaireInscription () {
      const conditionsDePassation = {
        user_agent: window.navigator.userAgent,
        hauteur_fenetre_navigation: window.innerHeight,
        largeur_fenetre_navigation: window.innerWidth
      };
      this.$store.commit('metsAJourConditionsDePassation', { conditionsDePassation });
      return this.$store.dispatch('inscris', {
        nom: this.nom,
        campagne: this.campagne
      })
        .then((utilisateur) => {
          if (utilisateur) {
            this.nom = this.forceNom;
            this.cgu = false;
            this.campagne = this.forceCampagne;
          }
        });
    },

    forceMajuscule () {
      this.campagne = this.campagne.toUpperCase();
    }
  }
};
</script>
