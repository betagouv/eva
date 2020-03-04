<template>
  <div class="question">
    <img
      :src="question.illustration"
      class="question-illustration"
    />
    <div class="question-barre">
      <div class="question-progression">
        {{ numeroQuestionCourante }}/{{ nombreQuestions }}
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'commun/styles/question.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  computed: mapGetters(['nombreQuestions', 'numeroQuestionCourante'])
};
</script>
