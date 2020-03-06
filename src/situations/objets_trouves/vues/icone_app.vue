<template>
  <div
    :class="{'icone--desactivee':desactivee}"
    class="icone"
  >
    <p class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</p>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      type: String,
      required: true
    },
    desactivee: {
      type: Boolean,
      required: true
    }
  }
};
</script>
