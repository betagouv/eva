<template>
  <div
    class="overlay modale"
    tabindex="0"
  >
    <div class="modale-interieur">
      <h2 v-if="titreConsigne !== ''">{{ titreConsigne }}</h2>
      <div
        v-html="message"
       ></div>
      <button
        class="bouton-arrondi"
        @click="fini"
      >{{ $traduction('accueil.intro_contexte.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import 'commun/styles/modale.scss';
import JoueurConsigne from 'commun/composants/joueur_consigne';
import { traduction } from 'commun/infra/internationalisation';

export const CONSIGNE_FINI = 'consigne-fini';

export default {
  props: {
    titreConsigne: {
      type: String,
      default: () => {
        return traduction('situation.consigne');
      }
    },
    message: {
      type: String,
      required: true
    },
    ressourceConsigne: {
      type: String,
      required: true
    }
  },

  computed: {
  },

  mounted () {
    this.joueConsigne();
  },

  methods: {

    joueConsigne () {
      this.consigne = new JoueurConsigne(this.$depotRessources, this.ressourceConsigne);
      this.consigne.joue(true, () => {});
    },

    fini () {
      this.consigne.stop();
      this.$emit(CONSIGNE_FINI);
    }
  }
};
</script>
