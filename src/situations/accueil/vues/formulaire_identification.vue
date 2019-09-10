<template>
  <transition name="fade">
    <form
      v-if="!estConnecte"
      id="formulaire-identification"
      class="formulaire-identification"
      @submit.prevent="envoieFormulaire">
      <div>
        <h2>{{ traduction('accueil.identification.titre') }}</h2>
        <label for="formulaire-identification-input-nom">
          {{ traduction('accueil.identification.label') }}
        </label>
        <div class="element-formulaire">
          <input
            id="formulaire-identification-input-nom"
            v-model.trim="nom"
            type="text"
            class="input-accueil"
            autofocus>
          <span
            v-if="erreurs.nom"
            class="erreur">{{ erreurs.nom[0] }}</span>
        </div>
        <label
          v-if="!campagneForcee"
          for="formulaire-identification-input-campagne">
          {{ traduction('accueil.identification.campagne') }}
        </label>
        <div
          v-if="!campagneForcee"
          class="element-formulaire">
          <input
            id="formulaire-identification-input-campagne"
            v-model.trim="campagne"
            type="text"
            class="input-accueil">
          <span
            v-if="erreurs.campagne"
            class="erreur">{{ erreurs.campagne[0] }}</span>
        </div>
        <label class="cgu-label">
          <input v-model="cgu" type="checkbox" />
          <span class="cgu-text">{{ traduction('accueil.identification.cgu') }}</span>
        </label>
        <div class="element-formulaire">
          <button
            :disabled="estDesactive"
            class="bouton-arrondi">{{ traduction('accueil.identification.bouton') }}</button>
        </div>
      </div>
    </form>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/formulaire_identification.scss';
import 'commun/styles/boutons.scss';

export default {
  props: {
    forceCampagne: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      nom: '',
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
    }
  },

  methods: {
    envoieFormulaire () {
      this.enCours = true;
      this.erreurs = {};
      return this.$store.dispatch('inscris', { nom: this.nom, campagne: this.campagne })
        .then(() => {
          this.nom = '';
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
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
