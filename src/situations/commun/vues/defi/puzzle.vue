<template>
  <div class="puzzle">
  </div>
</template>

<script>
import 'commun/styles/defi/puzzle.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  }
};
</script>
