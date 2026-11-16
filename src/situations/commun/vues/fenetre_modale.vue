<template>
  <div class="overlay modale">
    <div class="modale-interieur">
      <h2 v-html="titre" />
      <p
        v-if="message"
        v-html="message"
      />
      <div class="buttons">
        <button
          class="fr-btn bouton-ok"
          @click="$emit('ok')"
        >{{ boutonOk }}</button>
        <button
          v-if="boutonAnnuler"
          class="fr-btn fr-btn--rouge bouton-annuler"
          @click="$emit('annule')"
        >{{ boutonAnnuler }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/boutons.scss';
import 'commun/styles/modale.scss';

export default {
  props: {
    titre: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    boutonOk: {
      type: String,
      required: true
    },
    boutonAnnuler: {
      type: String,
      required: false
    }
  },

  emits: ['ok', 'annule']
};
</script>
