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
    <div
      v-if="estMobile"
      class="actions-robot"
      >
      <button
        :class="{ 'actions-robot--animation': choixFait === CHOIX_FRANCAIS }"
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
        :class="{ 'actions-robot--animation': choixFait === CHOIX_PASFRANCAIS }"
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
    <div
       v-if="!estMobile"
       class="actions-robot clavier"
       >
       <div
         :class="{ 'actions-robot--animation': choixFait === CHOIX_FRANCAIS }"
         class="touche-horizontale touche-gauche"
         @click="enregistreReponseViaSouris(CHOIX_FRANCAIS)"
         >
         <touche :label-gauche="$traduction('maintenance.francais')" couleur="verte" />
       </div>
       <div class="touches-verticales" >
         <touche :rotation=90 />
         <touche :rotation=270 />
       </div>
       <div
         :class="{ 'actions-robot--animation': choixFait === CHOIX_PASFRANCAIS }"
         class="touche-horizontale"
         @click="enregistreReponseViaSouris(CHOIX_PASFRANCAIS)"
         >
         <touche
           :rotation=180
           couleur="rouge"
           :label="$traduction('maintenance.pas_francais')" />
       </div>
    </div>
  </div>
</template>

<script>
import 'maintenance/styles/lexique.scss';
import 'commun/styles/boutons.scss';
import Touche from './touche';

import EvenementIdentificationMot from '../modeles/evenement_identification_mot';
import EvenementApparitionMot from '../modeles/evenement_apparition_mot';

import { isMobile } from 'mobile-device-detect';

const DELAI_CROIX = 500;

export const CHOIX_FRANCAIS = 'francais';
export const CHOIX_PASFRANCAIS = 'pasfrancais';

export default {
  components: {
    Touche
  },

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
    enregistreReponseViaSouris (choix) {
      if (this.estMobile) {
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
