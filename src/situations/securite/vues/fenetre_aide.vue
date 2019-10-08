<template>
  <div
    v-if="etat === 'presentation'"
    class="fenetre fenetre-aide-presentation">
    <div>{{ traduction('securite.aide.texte') }}</div>

    <button
      class="bouton-arrondi bouton-arrondi--petit fenetre-aide-presentation-bouton"
      @click="cacheAide"
    >{{ traduction('securite.aide.bouton') }}</button>
  </div>
  <div
    v-else-if="etat === 'activee'"
    class="aide-activee"
  >
    {{ traduction('securite.aide.activee') }}
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'securite/styles/fenetre.scss';
import 'securite/styles/fenetre_aide.scss';

export default {
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
