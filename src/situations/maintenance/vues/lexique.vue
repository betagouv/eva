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
  </div>
</template>

<script>
import 'maintenance/styles/lexique.scss';
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
    this.motSuivant();
  },

  methods: {
    motSuivant () {
      if (this.termine || this.croix) return;

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
