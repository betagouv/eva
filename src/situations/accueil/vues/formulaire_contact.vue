<template>
  <transition-fade>
    <form
      v-if="!estConnecte"
      class="overlay modale modale-formulaire-contact"
      @submit.prevent="envoieFormulaire">
      <div>
        <h2>{{ $traduction('accueil.identification.titre') }}</h2>
        <p class="formulaire-contact-description" v-html="$traduction('accueil.contact.description')"></p>
        <div class="elements-formulaire">
          <div>
            <label
              for="formulaire-identification-input-email">
              {{ $traduction('accueil.identification.email') }}
            </label>
            <div class="element-formulaire">
              <input
                id="formulaire-identification-input-email"
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
              for="formulaire-identification-input-telephone">
              {{ $traduction('accueil.identification.telephone') }}
            </label>
            <div
              class="element-formulaire">
              <input
                id="formulaire-identification-input-telephone"
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
          <button class="bouton-arrondi">{{ $traduction('accueil.identification.bouton') }}</button>
        </div>
      </div>
    </form>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/formulaire_contact.scss';
import 'commun/styles/boutons.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },

  data () {
    return {
      email: this.email,
      telephone: this.telephone,
      enCours: false,
      erreurs: {}
    };
  },

  computed: {
    ...mapState(['estConnecte']),
  },

  methods: {
    envoieFormulaire () {
      this.erreurs = {};
      return this.$store.dispatch('inscris', {
        email: this.email,
        telephone: this.telephone
      })
        .then(() => {
          this.email = '';
          this.telephone = '';
        })
        .catch((xhr) => {
          this.erreurs = xhr.responseJSON;
        })
    }
  }
};
</script>
