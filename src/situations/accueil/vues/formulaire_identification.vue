<template>
  <form
    v-if="!estConnecte"
    id="formulaire-identification"
    class="formulaire-identification"
    @submit.prevent="envoieFormulaire">
    <h2>{{ traduction('accueil.identification.titre') }}</h2>
    <label for="formulaire-identification-input-nom">
      {{ traduction('accueil.identification.label') }}
    </label>
    <div class="element-formulaire">
      <input
        v-model.trim="nom"
        type="text"
        class="input-accueil"
        autofocus>
      <span
        v-if="erreurs.nom"
        class="erreur">{{ erreurs.nom[0] }}</span>
    </div>
    <label for="formulaire-identification-input-campagne">
      {{ traduction('accueil.identification.campagne') }}
    </label>
    <div class="element-formulaire">
      <input
        v-model.trim="campagne"
        type="text"
        class="input-accueil">
      <span
        v-if="erreurs.campagne"
        class="erreur">{{ erreurs.campagne[0] }}</span>
    </div>
    <div class="element-formulaire">
      <button
        :disabled="estDesactive"
        class="bouton-arrondi">{{ traduction('accueil.identification.boutton') }}</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/formulaire_identification.scss';
import 'commun/styles/boutons.scss';

export default {
  data () {
    return {
      nom: '',
      campagne: '',
      enCours: false,
      erreurs: {}
    };
  },

  computed: {
    ...mapState(['estConnecte']),

    estDesactive () {
      return this.nom === '' || this.campagne === '' || this.enCours;
    }
  },

  methods: {
    envoieFormulaire () {
      this.enCours = true;
      this.erreurs = {};
      return this.$store.dispatch('inscris', { nom: this.nom, campagne: this.campagne })
        .then(() => {
          this.nom = '';
          this.campagne = '';
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
