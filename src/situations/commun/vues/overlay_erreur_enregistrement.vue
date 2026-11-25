<template>
  <div class="overlay modale overlay-erreur-enregistrement">
    <div class="modale-interieur">
      <h2 class="titre-erreur-enregistrement">
        <svg
          class="icone-alerte"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        ><path d="m12.866 3 9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0ZM11 16v2h2v-2h-2Zm0-7v5h2V9h-2Z" /></svg>
        {{ $traduction('situation.erreur_enregistrement.titre') }}
      </h2>
      <p>{{ $traduction('situation.erreur_enregistrement.description') }}</p>
      <p>{{ $traduction('situation.erreur_enregistrement.action') }}</p>
      <p>{{ $traduction('situation.erreur_enregistrement.action_si_echec') }}</p>
      <div class="buttons">
        <button
          class="fr-btn bouton-relance-enregistrement"
          @click="relance"
        >
          {{ $traduction('situation.erreur_enregistrement.bouton') }}
        </button>
        <button
          v-if="abandonne"
          class="fr-btn fr-btn--secondary bouton-abandon-enregistrement"
          @click="abandonne"
        >
          {{ $traduction('situation.erreur_enregistrement.bouton_abandon') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';

export default {
  props: {
    relance: {
      type: Function,
      required: true
    },
    abandonne: {
      type: Function,
      default: null
    }
  }
};
</script>

<style scoped>
.titre-erreur-enregistrement {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icone-alerte {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  fill: var(--text-default-warning);
}
</style>
