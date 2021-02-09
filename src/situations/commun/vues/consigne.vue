<template>
  <div
    class="overlay modale"
    tabindex="0"
  >
    <div class="modale-interieur">
      <h2 v-if="titreConsigne !== ''">
        {{ titreConsigne }}
        <img :src="son" class="icone-description-titre" />
      </h2>
      <div
        v-html="message"
       ></div>
      <div
        v-if="afficheAideComplementaire()"
        class="conteneur-message-aide">
        <div
          class="message-aide"
          v-html="messageAideComplementaire"
        ></div>
        <img
          class="image-aide"
          :src="imageAideComplementaire"
        />
      </div>
      <button
        class="bouton-arrondi"
        @click="fini"
      >{{ $traduction('accueil.intro_contexte.bouton') }}</button>
    </div>
  </div>
</template>

<script>
import i18next from 'i18next';
import 'commun/styles/modale.scss';
import 'commun/styles/consigne.scss';
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
    },
    identifiantSituation: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      messageAideComplementaire: traduction(`${this.identifiantSituation}.aide_complementaire.message`),
      son: this.$depotRessources.son().src
    };
  },

  mounted () {
    this.joueConsigne();
  },

  computed: {
    imageAideComplementaire: function () {
      return this.$depotRessources.imageAideComplementaire().src;
    }
  },

  methods: {
    afficheAideComplementaire () {
      return i18next.exists(`${this.identifiantSituation}.aide_complementaire`);
    },

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
