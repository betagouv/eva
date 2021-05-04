<template>
  <div
    class="mot-conteneur"
    tabindex="0"
    @keydown.left="enregistreReponseViaClavier(CHOIX_FRANCAIS)"
    @keydown.right="enregistreReponseViaClavier(CHOIX_PASFRANCAIS)"
    @keydown.e="enregistreReponseViaClavier(CHOIX_FRANCAIS)"
    @keydown.i="enregistreReponseViaClavier(CHOIX_PASFRANCAIS)"
  >
    <div
      v-if="mot"
      class="mot">
      {{ lexique[index].mot }}
    </div>
    <img
      v-if="croix"
      :src="$depotRessources.croix().src"
      class="croix"
    >
    <div class="boutons">
      <button
        :class="{ 'bouton-arrondi--animation': choixFait === CHOIX_FRANCAIS, 'clavier': !estMobile }"
        class="bouton-arrondi bouton-arrondi-vert"
        @click="enregistreReponseViaSouris(CHOIX_FRANCAIS)"
      >
        <img
          :src="$depotRessources.flecheGauche().src"
          class="bouton-arrondi-icone bouton-arrondi-icone--droite"
        />
        <span class="bouton-arrondi-texte">{{ $traduction('maintenance.francais') }}</span>
      </button>
      <button
        :class="{ 'bouton-arrondi--animation': choixFait === CHOIX_PASFRANCAIS, 'clavier': !estMobile }"
        class="bouton-arrondi bouton-arrondi-rouge"
        @click="enregistreReponseViaSouris(CHOIX_PASFRANCAIS)"
      >
        <img
          :src="$depotRessources.flecheDroite().src"
          class="bouton-arrondi-icone"
        />
        <span class="bouton-arrondi-texte">{{ $traduction('maintenance.pas_francais') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import 'maintenance/styles/lexique.scss';
import 'commun/styles/boutons.scss';

import EvenementIdentificationMot from '../modeles/evenement_identification_mot';
import EvenementApparitionMot from '../modeles/evenement_apparition_mot';

import { isMobile } from 'mobile-device-detect';

const DELAI_CROIX = 500;

export const CHOIX_FRANCAIS = 'francais';
export const CHOIX_PASFRANCAIS = 'pasfrancais';

export default {
  props: {
    lexique: {
      type: Array,
      required: true
    }
  },

  data: function () {
    return {
      index: -1,
      croix: false,
      mot: false,
      choixFait: null,
      CHOIX_FRANCAIS,
      CHOIX_PASFRANCAIS,
      estMobile: isMobile
    };
  },

  computed: {
    termine () {
      return this.index === (this.lexique.length - 1);
    }
  },

  mounted () {
    this.$el.focus();
    this.prepareMotSuivant();
  },

  methods: {
    enregistreReponseViaClavier (choix) {
      this.enregistreReponse(choix);
    },
    enregistreReponseViaSouris (choix, estMobile = isMobile) {
      if (estMobile) {
        this.enregistreReponse(choix);
      }
    },
    enregistreReponse (choix) {
      if (this.croix) return;

      this.choixFait = choix;
      this.$journal.enregistre(
        new EvenementIdentificationMot({
          ...this.lexique[this.index],
          reponse: choix
        })
      );

      if (this.termine) {
        this.$emit('terminer');
        return;
      }

      this.prepareMotSuivant();
    },
    prepareMotSuivant () {
      this.affichePointDeFixation();
      setTimeout(() => {
        this.choixFait = null;
        this.afficheMot();
      }, DELAI_CROIX);
    },
    afficheMot () {
      this.index++;
      this.croix = false;
      this.mot = true;
      this.$journal.enregistre(
        new EvenementApparitionMot({ ...this.lexique[this.index] })
      );
    },
    affichePointDeFixation () {
      this.croix = true;
      this.mot = false;
    }
  }
};
</script>
