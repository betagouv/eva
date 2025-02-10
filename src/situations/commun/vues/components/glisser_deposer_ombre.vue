<template>
  <svg
    class="rectangle-bleu"
    :class="{ 'rectangle-bleu--cache': !elementGlisse, 'rectangle-bleu--visible': elementGlisse }"
    viewBox="0 0 222 222"
    fill="none">
  </svg>
</template>

<script>
import 'commun/styles/glisser_deposer.scss';

export default {
  props: {
    elementGlisse: {
      type: Boolean,
      required: true
    }
  }
};
</script>
