<template>
  <div class="icone">
    <p class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</p>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      type: String,
      required: true
    }
  }
};
</script>
