<template>
  <div class="overlay modale overlay-erreur-enregistrement">
    <div class="modale-interieur">
      <h2 class="titre-erreur-enregistrement">
        <span
          class="icone-alerte fr-icon-error-warning-fill"
          aria-hidden="true"
        />
        {{ $traduction('situation.erreur_enregistrement.titre') }}
      </h2>
      <p>{{ $traduction('situation.erreur_enregistrement.description') }}</p>
      <p>{{ $traduction('situation.erreur_enregistrement.action') }}</p>
      <p>{{ $traduction('situation.erreur_enregistrement.action_si_echec') }}</p>
      <div class="buttons">
        <button
          class="fr-btn fr-btn--icon-left fr-icon-refresh-line bouton-relance-enregistrement"
          @click="relance"
        >
          {{ $traduction('situation.erreur_enregistrement.bouton') }}
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
    }
  }
};
</script>

<style scoped>
.overlay-erreur-enregistrement .modale-interieur {
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
}

.titre-erreur-enregistrement {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icone-alerte {
  color: var(--text-default-warning);
}

.icone-alerte::before {
  --icon-size: 2.5rem;
}
</style>
