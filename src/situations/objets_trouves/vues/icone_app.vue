<template>
  <div>
    <div
      class="icone"
      :class="[{'icone--desactivee':desactivee}, `icone--${app}`]"
      v-bind:style="{ 'background-image': `url(${appAttributes(app).icone})` }"
    ></div>
    <span class="label">{{ $traduction(`objets_trouves.accueil.${app}`) }}</span>
  </div>
</template>
<script>
export default {
  props: {
    app: {
      type: String,
      required: true
    },
    apps: {
      type: Object,
      required: true
    },
    desactivee: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    appAttributes (app) {
      return Object.assign({}, this.apps)[app][0];
    }
  }
};
</script>
