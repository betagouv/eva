<template>
  <span class="mot"
        :class="{ 'mot--selectionne': estSelectionne }"
      >
      {{libelle}}
  </span>
</template>

<script>

export default {
  props: {
    libelle: {
      type: String,
      required: true
    },
    estSelectionne: {
      type: Boolean,
      required: true
    }
  }
};
</script>
