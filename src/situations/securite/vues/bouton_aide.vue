<template>
  <button
    :disabled="aide"
    class="bouton-arrondi bouton-arrondi--petit"
    @click="activeAide"
  >{{ $traduction('securite.activation_aide') }}</button>
</template>

<script>
import { mapState } from 'vuex';
import EvenementActivationAide from 'securite/modeles/evenement_activation_aide';

export default {
  computed: mapState(['aide']),

  methods: {
    activeAide () {
      this.$store.commit('activeAide');
      this.$journal.enregistre(new EvenementActivationAide());
    }
  }
};
</script>
