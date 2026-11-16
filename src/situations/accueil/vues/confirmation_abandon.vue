<template>
  <div class="overlay modale confirmation-abandon">
    <div class="modale-interieur">
      <h2 v-html="$traduction('abandon.confirmation')" />
      <div class="buttons">
        <button
          class="fr-btn confirme-bouton"
          @click="$emit('confirme')"
        >{{ $traduction('abandon.oui') }}</button>
        <button
          class="fr-btn fr-btn--rouge annulation-bouton"
          @click="$emit('annule')"
        >{{ $traduction('abandon.non') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';

export default {
  emits: ['confirme', 'annule']
};
</script>
