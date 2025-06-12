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
            <label for="formulaire-identification-champ">
              {{ modeConnexion === 'nom'
                ? $traduction('accueil.identification.label')
                : $traduction('accueil.identification.label_code_personnel') }}
            </label>

            <div class="element-formulaire">
              <input
                id="formulaire-identification-champ"
                v-model.trim="champCodePersonnel"
                type="text"
                class="champ champ-texte champ-texte-accueil"
                :disabled="nomForce && modeConnexion === 'nom'"
                autofocus
              />

              <span v-if="champErreur && modeConnexion === 'nom'" class="erreur-message">
                {{ champErreur }}
              </span>
              <span v-if="champErreur && modeConnexion === 'code_personnel'" class="erreur-message">
                {{ champErreur }}
              </span>

              <p class="texte-lien" @click="toggleMode">
                {{ modeConnexion === 'nom'
                    ? $traduction('accueil.identification.avec_code_personnel')
                    : $traduction('accueil.identification.sans_code_personnel') }}
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
    },
    forceCodePersonnel: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      nom: this.forceNom,
      modeConnexion: this.forceCodePersonnel ? 'identifiant' : 'nom',
      codePersonnel: this.forceCodePersonnel,
      campagne: this.forceCampagne.toUpperCase(),
      enCours: false,
      cgu: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'erreurFormulaireIdentification']),

    champCodePersonnel: {
      get () {
        return this.modeConnexion === 'nom' ? this.nom : this.codePersonnel;
      },
      set (val) {
        if (this.modeConnexion === 'nom') {
          this.nom = val;
        } else {
          this.codePersonnel = val;
        }
      }
    },

    champErreur () {
      return this.modeConnexion === 'nom'
        ? this.erreurFormulaireIdentification.nom
        : this.erreurFormulaireIdentification.beneficiaire;
    },

    estDesactive () {
      if (!this.cgu || this.enCours || this.campagne === '') return true;
      return this.champCodePersonnel === '';
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

          return this.envoieFormulaireInscription();
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
        campagne: this.campagne,
        conditionsDePassation,
        codePersonnel: this.codePersonnel
      }).then((utilisateur) => {
        if (utilisateur) {
          this.nom = this.forceNom;
          this.codePersonnel = this.forceCodePersonnel;
          this.cgu = false;
          this.campagne = this.forceCampagne;
        }
      });
    },

    toggleMode () {
      this.modeConnexion = this.modeConnexion === 'nom' ? 'code_personnel' : 'nom';
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