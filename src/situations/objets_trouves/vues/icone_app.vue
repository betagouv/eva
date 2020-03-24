<template>
  <div :class="{'icone--desactivee':desactivee}">
    <div
      class="icone"
      v-bind:style="{ 'background-color': couleur(app), 'background-image': `url(${appAttributes(app).icone})` }"
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
    },
    couleur (app) {
      return this.desactivee ? '#D6DAEC' : this.appAttributes(app).couleur;
    }
  }
};
</script>
