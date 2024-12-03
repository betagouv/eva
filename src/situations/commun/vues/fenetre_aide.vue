<template>
  <transition-fade>
    <div class="fenetre fenetre-aide-presentation">
      <div>{{ texteAide }}</div>

      <button
        class="bouton-arrondi bouton-arrondi--petit fenetre-aide-presentation-bouton"
        @click="cacheAide"
      >{{ $traduction('situation.bouton_aide') }}</button>
    </div>
  </transition-fade>
</template>

<script>
import 'commun/styles/fenetre.scss';
import 'commun/styles/fenetre_aide.scss';
import TransitionFade from 'commun/vues/transition_fade';
import { traduction } from 'commun/infra/internationalisation';

export const FERME = 'ferme';

export default {
  components: { TransitionFade },

  props: {
    contexte: {
      type: String,
      required: true
    }
  },

  computed: {
    texteAide() {
      return this.$depotRessources.texteAide ?? traduction(`${this.contexte}.texte_aide`);
    }
  },

  methods: {
    cacheAide () {
      this.$emit(FERME);
    }
  }
};
</script>
