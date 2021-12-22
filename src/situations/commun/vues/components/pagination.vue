<template>
  <div class="question-pagination">
    {{ indexQuestion + 1 }}/{{ nombreQuestions }}
  </div>
</template>

<script>
import 'commun/styles/pagination.scss';

export default {
  props: {
    indexQuestion: {
      type: Number,
      required: true
    },

    nombreQuestions: {
      type: Number,
      required: true
    }
  }
};
</script>
