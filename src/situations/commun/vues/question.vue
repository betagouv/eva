<template>
  <div class="question">
    <img
      :src="illustrationQuestion(question)"
      class="question-illustration"
      draggable="false"
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
      return question.illustration ?? this.$depotRessources.illustrationQuestion(question).src;
    }
  }
};
</script>
