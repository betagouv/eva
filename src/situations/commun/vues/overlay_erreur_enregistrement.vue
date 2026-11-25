<template>
  <div class="overlay opaque overlay-action overlay-erreur-enregistrement">
    <div class="overlay-action-message">
      <h2>{{ $traduction('situation.erreur_enregistrement.titre') }}</h2>
      <p>{{ $traduction('situation.erreur_enregistrement.description') }}</p>
      <p>{{ $traduction('situation.erreur_enregistrement.action') }}</p>
      <button
        class="fr-btn bouton-relance-enregistrement"
        @click="relance"
      >
        {{ $traduction('situation.erreur_enregistrement.bouton') }}
      </button>
    </div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/action_overlay.scss';

export default {
  props: {
    relance: {
      type: Function,
      required: true
    }
  }
};
</script>
