<template>
  <form
    class="overlay modale modale-formulaire"
    @submit.prevent="envoieFormulaire">
    <div>
      <h2 v-html="$traduction('accueil.contact.titre', { nom: nom })"></h2>
      <p class="formulaire-contact-description" v-html="$traduction('accueil.contact.description')"></p>
      <div class="elements-formulaire">
        <div>
          <label
            for="formulaire-contact-input-email">
            {{ $traduction('accueil.contact.email') }}
          </label>
          <div class="element-formulaire">
            <input
              id="formulaire-contact-input-email"
              v-model.trim="email"
              type="text"
              class="input-accueil"
              placeholder="nom@email.com">
            <span
              v-if="erreurs.email"
              class="erreur">{{ erreurs.email[0] }}</span>
          </div>
        </div>
        <div>
          <label
            for="formulaire-contact-input-telephone">
            {{ $traduction('accueil.contact.telephone') }}
          </label>
          <div
            class="element-formulaire">
            <input
              id="formulaire-contact-input-telephone"
              v-model.trim="telephone"
              type="text"
              class="input-accueil"
              placeholder="01 23 45 67 89">
            <span
              v-if="erreurs.telephone"
              class="erreur">{{ erreurs.telephone[0] }}</span>
          </div>
        </div>
      </div>
      <div class="element-formulaire">
        <button class="bouton-arrondi">{{ $traduction('accueil.contact.bouton') }}</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/formulaire.scss';
import 'commun/styles/boutons.scss';

export default {
  data () {
    return {
      email: this.email,
      telephone: this.telephone,
      enCours: false,
      erreurs: {}
    };
  },

  computed: {
    ...mapState(['estConnecte', 'nom'])
  },

  methods: {
    envoieFormulaire () {
      this.erreurs = {};
      return this.$store.dispatch('enregistreContact', {
        email: this.email,
        telephone: this.telephone
      })
        .then(() => {
          this.email = '';
          this.telephone = '';
        })
        .catch((xhr) => {
          this.erreurs = xhr.responseJSON;
        });
    }
  }
};
</script>
