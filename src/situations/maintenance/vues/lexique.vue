<template>
  <div
    class="mot-conteneur"
  >
    <Keypress key-event="keydown" :multiple-keys="touches_francais" @success="enregistreReponse(CHOIX_FRANCAIS)" />
    <Keypress key-event="keydown" :multiple-keys="touches_pas_francais" @success="enregistreReponse(CHOIX_PASFRANCAIS)" />
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
        @click="enregistreReponse(CHOIX_FRANCAIS)"
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
        @click="enregistreReponse(CHOIX_PASFRANCAIS)"
      >
        <img
          :src="$depotRessources.flecheDroite().src"
          class="bouton-arrondi-icone"
        />
        <span class="bouton-arrondi-texte">{{ $traduction('maintenance.pas_francais') }}</span>
      </button>
    </div>
    <div
       v-else
       class="actions-robot clavier"
       >
       <div
         :class="{ 'actions-robot--animation': choixFait === CHOIX_FRANCAIS }"
         class="touche-horizontale touche-gauche"
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

import Keypress from 'vue-keypress';
import { isMobile, isIOs, isAndroid } from 'mobile-device-detect';

const DELAI_CROIX = 500;

export const CHOIX_FRANCAIS = 'francais';
export const CHOIX_PASFRANCAIS = 'pasfrancais';

export default {
  components: { Touche, Keypress },

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
      estMobile: isMobile || isIOs || isAndroid,
      touches_francais: [
        {
          keyCode: 37, // Flèche gauche
          modifiers: [],
          preventDefault: false
        },
        {
          keyCode: 69, // e
          modifiers: [],
          preventDefault: false
        }
      ],
      touches_pas_francais: [
        {
          keyCode: 39, // Flèche droite
          modifiers: [],
          preventDefault: false
        },
        {
          keyCode: 73, // i
          modifiers: [],
          preventDefault: false
        }
      ]
    };
  },

  computed: {
    termine () {
      return this.index === (this.lexique.length - 1);
    }
  },

  mounted () {
    this.prepareMotSuivant();
  },

  methods: {
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
