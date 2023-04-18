<template>
  <div class="question">
    <img
      :src="illustration"
      class="question-illustration"
    />

    <div class="question-barre">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['illustrationQuestion', 'fondSituation']),

    illustration(){
      try {
        return this.illustrationQuestion(this.question);
      } catch(erreur) {
        if (erreur.name === "illustrationIntrouvable") {
          console.error(erreur);
          return this.fondSituation;
        } else {
          throw erreur;
        }
      }
    }
  },
};
</script>
