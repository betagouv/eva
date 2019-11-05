<template>
  <transition-fade>
    <div class="fenetre fenetre-aide-presentation">
      <div>{{ $traduction('securite.aide.texte') }}</div>

      <button
        class="bouton-arrondi bouton-arrondi--petit fenetre-aide-presentation-bouton"
        @click="cacheAide"
      >{{ $traduction('securite.aide.bouton') }}</button>
    </div>
  </transition-fade>
</template>

<script>
import 'commun/styles/fenetre.scss';
import 'commun/styles/fenetre_aide.scss';
import TransitionFade from 'commun/vues/transition_fade';

export const FERME = 'ferme';

export default {
  components: { TransitionFade },

  methods: {
    cacheAide () {
      this.$emit(FERME);
    }
  }
};
</script>
