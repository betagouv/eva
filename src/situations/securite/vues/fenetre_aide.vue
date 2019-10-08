<template>
  <transition-fade>
    <div
      key="presentation"
      v-if="etat === 'presentation'"
      class="fenetre fenetre-aide-presentation">
      <div>{{ traduction('securite.aide.texte') }}</div>

      <button
        class="bouton-arrondi bouton-arrondi--petit fenetre-aide-presentation-bouton"
        @click="cacheAide"
      >{{ traduction('securite.aide.bouton') }}</button>
    </div>
    <div
      key="activee"
      v-else-if="etat === 'activee'"
      class="aide-activee"
    >
      {{ traduction('securite.aide.activee') }}
    </div>
  </transition-fade>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/fenetre.scss';
import 'securite/styles/fenetre_aide.scss';
import TransitionFade from 'commun/vues/transition_fade';

export default {
  components: { TransitionFade },

  data () {
    return {
      etat: 'cachee'
    };
  },

  computed: mapState(['aide']),

  methods: {
    cacheAide () {
      this.etat = 'activee';
    }
  },

  watch: {
    aide () {
      this.etat = 'presentation';
    }
  }
};
</script>
