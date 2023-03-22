<template>
  <div class="question">
    <img
      :src="illustrationQuestion(question)"
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
    illustrationQuestion(question) {
      return this.$depotRessources.illustrationQuestion(question).src;
    }
  }
};
</script>
