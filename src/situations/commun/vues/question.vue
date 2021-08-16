<template>
  <div class="question">
    <img
      :src="urlIllustration(question)"
      class="question-illustration"
    />

    <div class="question-barre">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  methods: {
    urlIllustration (question) {
      return this.$depotRessources.illustrationQuestion(question.nom_technique_illustration).src;
    }
  }
};
</script>
