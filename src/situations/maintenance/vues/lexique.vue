<template>
  <div
    class="mot-conteneur"
    tabindex="0"
    @keydown.left="motSuivant(CHOIX_FRANCAIS)"
    @keydown.right="motSuivant(CHOIX_PASFRANCAIS)"
    @keydown.e="motSuivant(CHOIX_FRANCAIS)"
    @keydown.i="motSuivant(CHOIX_PASFRANCAIS)"
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
        :class="{ 'bouton-arrondi--animation': choixFait === CHOIX_FRANCAIS }"
        class="bouton-arrondi bouton-arrondi-vert"
        @click="motSuivant(CHOIX_FRANCAIS)"
      >
        <img
          :src="$depotRessources.flecheGauche().src"
          class="bouton-arrondi-icone bouton-arrondi-icone--droite"
        />
        <span class="bouton-arrondi-texte">{{ $traduction('maintenance.francais') }}</span>
      </button>
      <button
        :class="{ 'bouton-arrondi--animation': choixFait === CHOIX_PASFRANCAIS }"
        class="bouton-arrondi bouton-arrondi-rouge"
        @click="motSuivant(CHOIX_PASFRANCAIS)"
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

const DELAI_CROIX = 500;
const DELAI_MOT = 6000;

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
      CHOIX_PASFRANCAIS
    };
  },

  computed: {
    termine () {
      return this.index === (this.lexique.length - 1);
    }
  },

  mounted () {
    this.$el.focus();
    this.motSuivantAvecDelai();
  },

  methods: {
    motSuivant (choix) {
      if (this.croix) return;

      clearTimeout(this.delaiAffichageMot);

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

      this.motSuivantAvecDelai();
    },
    motSuivantAvecDelai () {
      this.affichePointDeFixation();
      setTimeout(() => {
        this.choixFait = null;
        this.afficheMot();
        this.delaiAffichageMot = setTimeout(() => {
          this.motSuivant();
        }, DELAI_MOT);
      }, DELAI_CROIX);
    },
    afficheMot () {
      this.index++;
      this.croix = false;
      this.mot = true;
    },
    affichePointDeFixation () {
      this.croix = true;
      this.mot = false;
    }
  }
};
</script>
