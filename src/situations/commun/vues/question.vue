<template>
  <div class="question">
    <img
      :src="question.illustration"
      class="question-illustration"
    />

    <div
      v-if="appActive && appActive != 'deverrouillage'"
      class="icone-conteneur"
    >
      <div
        class="icone"
        :class="icone()"
        :style="{ 'background-image': `url(${appAttributes().icone})` }"
      ></div>
      <span class="label">{{ $traduction(`objets_trouves.accueil.${appActive}`) }}</span>
    </div>

    <div class="question-barre">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'objets_trouves/styles/acte.scss';

export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['appActive', 'apps'])
  },
  methods: {
    appAttributes () {
      return Object.assign({}, this.apps)[this.appActive][0];
    },
    icone () {
      return `icone--${this.appActive}`;
    }
  }
};
</script>
