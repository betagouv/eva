<template>
  <transition-fade>
    <form
      v-if="!estConnecte"
      class="overlay modale modale-formulaire"
      @submit.prevent="envoieFormulaire">
      <div>
        <h2 class="formulaire-identification-titre">{{ $traduction('accueil.identification.titre') }}</h2>

        <div v-if="erreurFormulaireIdentification.generale" class="erreur-generale">
          {{ erreurFormulaireIdentification.generale }}
        </div>

        <div class="elements-formulaire">
          <div>
            <label v-if="modeConnexion === 'nom'" for="formulaire-identification-champ-nom">
              {{ $traduction('accueil.identification.label') }}
            </label>
            <label v-else for="formulaire-identification-champ-identifiant">
              {{ $traduction('accueil.identification.label_identifiant') }}
            </label>

            <div class="element-formulaire">
              <input
                v-if="modeConnexion === 'nom'"
                id="formulaire-identification-champ-nom"
                v-model.trim="nom"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                :disabled="nomForce"
                autofocus>
              <input
                v-else
                id="formulaire-identification-champ-identifiant"
                v-model.trim="identifiant"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                autofocus>

              <span v-if="erreurFormulaireIdentification.nom" class="erreur-message">
                {{ erreurFormulaireIdentification.nom }}
              </span>
              <span v-if="erreurFormulaireIdentification.identifiant" class="erreur-message">
                {{ erreurFormulaireIdentification.identifiant }}
              </span>
              <p class="texte-lien" @click="toggleMode">
                {{ modeConnexion === 'nom'
                    ? $traduction('accueil.identification.avec_identifiant')
                    : $traduction('accueil.identification.sans_identifiant') }}
              </p>
            </div>
          </div>

          <div>
            <label for="formulaire-identification-champ-campagne">
              {{ $traduction('accueil.identification.campagne') }}
            </label>
            <div class="element-formulaire">
              <input
                id="formulaire-identification-champ-campagne"
                v-model.trim="campagne"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                :disabled="champCodeEstDesactive"
                :class="{ 'erreur-champ': erreurFormulaireIdentification.code }"
                @focusout="forceMajuscule">
              <div v-if="erreurFormulaireIdentification.code" class="erreur-message">
                {{ erreurFormulaireIdentification.code }}
              </div>
            </div>
          </div>
        </div>

        <label class="cgu-label">
          <input v-model="cgu" type="checkbox" />
          <span class="cgu-text" v-html="$traduction('accueil.identification.cgu')"></span>
        </label>

        <div class="element-formulaire">
          <button :disabled="estDesactive" class="bouton-arrondi">
            {{ $traduction('accueil.identification.bouton') }}
          </button>
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
      modeConnexion: 'nom',
      nom: this.forceNom,
      identifiant: '',
      campagne: this.forceCampagne.toUpperCase(),
      enCours: false,
      cgu: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'erreurFormulaireIdentification']),

    estDesactive () {
      if (!this.cgu || this.enCours || this.campagne === '') return true;
      return this.modeConnexion === 'nom'
        ? this.nom === ''
        : this.identifiant === '';
    },

    campagneForcee () {
      return this.forceCampagne !== '';
    },

    nomForce () {
      return this.forceNom !== '';
    },

    champCodeEstDesactive () {
      if (this.erreurFormulaireIdentification) return false;
      return this.campagneForcee;
    }
  },

  methods: {
    envoieFormulaire () {
      this.enCours = true;

      return this.$store.dispatch('recupereCampagne', {
        codeCampagne: this.campagne
      })
        .then((campagne) => {
          if (!campagne) return;

          if (this.modeConnexion === 'nom') {
            return this.envoieFormulaireInscription();
          } else {
            return this.envoieFormulaireIdentifiant();
          }
        })
        .finally(() => {
          this.enCours = false;
        });
    },

    envoieFormulaireInscription () {
      const conditionsDePassation = this.recupereConditions();
      this.$store.commit('metsAJourConditionsDePassation', { conditionsDePassation });

      return this.$store.dispatch('inscris', {
        nom: this.nom,
        campagne: this.campagne
      }).then((utilisateur) => {
        if (utilisateur) {
          this.nom = this.forceNom;
          this.cgu = false;
          this.campagne = this.forceCampagne;
        }
      });
    },

    envoieFormulaireIdentifiant () {
      const conditionsDePassation = this.recupereConditions();
      this.$store.commit('metsAJourConditionsDePassation', { conditionsDePassation });

      return this.$store.dispatch('connexionParIdentifiant', {
        identifiant: this.identifiant,
        campagne: this.campagne
      });
    },

    toggleMode () {
      this.modeConnexion = this.modeConnexion === 'nom' ? 'identifiant' : 'nom';
    },

    forceMajuscule () {
      this.campagne = this.campagne.toUpperCase();
    },

    recupereConditions () {
      return {
        user_agent: window.navigator.userAgent,
        hauteur_fenetre_navigation: window.innerHeight,
        largeur_fenetre_navigation: window.innerWidth
      };
    }
  }
};
</script>