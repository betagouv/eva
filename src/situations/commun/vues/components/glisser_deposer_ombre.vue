<template>
  <svg
    class="rectangle-bleu"
    :class="{ 'rectangle-bleu--cache': !elementGlisse, 'rectangle-bleu--visible': elementGlisse }"
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
