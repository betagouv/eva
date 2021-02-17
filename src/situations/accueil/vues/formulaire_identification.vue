<template>
  <transition-fade>
    <form
      v-if="!estConnecte"
      class="overlay modale modale-formulaire"
      @submit.prevent="envoieFormulaire">
      <div>
        <h2 class="formulaire-identification-titre">{{ $traduction('accueil.identification.titre') }}</h2>
        <div class="elements-formulaire">
          <div>
            <label
              v-if="!nomForce"
              for="formulaire-identification-input-nom">
              {{ $traduction('accueil.identification.label') }}
            </label>
            <div
              class="element-formulaire"
              v-if="!nomForce">
              <input
                id="formulaire-identification-input-nom"
                v-model.trim="nom"
                type="text"
                class="input-accueil"
                autofocus>
              <span
                v-if="erreurs.nom"
                class="erreur-message">{{ erreurs.nom[0] }}</span>
            </div>
          </div>
          <div>
            <label
              v-if="!campagneForcee"
              for="formulaire-identification-input-campagne">
              {{ $traduction('accueil.identification.campagne') }}
            </label>
            <div
              v-if="!campagneForcee"
              class="element-formulaire">
              <input
                id="formulaire-identification-input-campagne"
                v-model.trim="campagne"
                type="text"
                class="input-accueil"
                :class="{ erreur_champ: erreurs.code_campagne }">
              <span
                v-if="erreurs.code_campagne"
                class="erreur-message">{{ erreurs.code_campagne[0] }}</span>
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
      campagne: this.forceCampagne,
      enCours: false,
      erreurs: {},
      cgu: false
    };
  },

  computed: {
    ...mapState(['estConnecte']),

    estDesactive () {
      return this.nom === '' || this.campagne === '' || !this.cgu || this.enCours;
    },

    campagneForcee () {
      return this.forceCampagne !== '';
    },

    nomForce () {
      return this.forceNom !== '';
    }
  },

  methods: {
    envoieFormulaire () {
      this.enCours = true;
      this.erreurs = {};
      return this.$store.dispatch('inscris', {
        nom: this.nom,
        campagne: this.campagne
      })
        .then(() => {
          this.nom = this.forceNom;
          this.cgu = false;
          this.campagne = this.forceCampagne;
        })
        .catch((xhr) => {
          this.erreurs = xhr.responseJSON;
        })
        .finally(() => {
          this.enCours = false;
        });
    }
  }
};
</script>
