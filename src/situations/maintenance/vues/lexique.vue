<template>
  <div
    class="mot-conteneur"
    tabindex="0"
    @keydown.left="motSuivant"
    @keydown.right="motSuivant"
  >
    <div
      v-if="mot"
      class="mot">
      {{ lexique[index] }}
    </div>
    <img
      v-if="croix"
      :src="$depotRessources.croix().src"
      class="croix"
    >
    <div class="boutons">
      <button
        class="bouton-arrondi bouton-arrondi-vert"
        @click="motSuivant"
      >
        <img
          :src="$depotRessources.flecheGauche().src"
          class="bouton-arrondi-icone bouton-arrondi-icone--droite"
        />
        <span class="bouton-arrondi-texte">{{ $traduction('maintenance.francais') }}</span>
      </button>
      <button
        class="bouton-arrondi bouton-arrondi-rouge"
        @click="motSuivant"
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

const DELAI_CROIX = 500;
const DELAI_MOT = 6000;

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
      delaiAffichageMot: ''
    };
  },

  computed: {
    termine () {
      return this.index === (this.lexique.length - 1);
    }
  },

  mounted () {
    this.$el.focus();
    this.motSuivant();
  },

  methods: {
    motSuivant () {
      if (this.croix) return;
      if (this.termine) {
        this.$emit('terminer');
      }

      this.motSuivantAvecDelai();
    },
    motSuivantAvecDelai () {
      clearTimeout(this.delaiAffichageMot);
      this.affichePointDeFixation();
      setTimeout(() => {
        this.afficheMot();
        this.delaiAffichageMot = setTimeout(() => {
          this.motSuivant();
        }, DELAI_MOT);
      }, DELAI_CROIX);
    },
    afficheMot () {
      this.croix = false;
      this.mot = true;
      this.index++;
    },
    affichePointDeFixation () {
      this.croix = true;
      this.mot = false;
    }
  }
};
</script>
