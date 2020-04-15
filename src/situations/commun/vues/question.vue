<template>
  <div class="question">
    <img
      :src="question.illustration"
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
  }
};
</script>
