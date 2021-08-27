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
import { mapGetters } from 'vuex';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['illustrationQuestion'])
  }
};
</script>
