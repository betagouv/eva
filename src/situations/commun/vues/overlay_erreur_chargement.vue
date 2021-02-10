<template>
  <div class="overlay opaque overlay-action">
    <div class="bouton-centre-invisible">
      <a class="bouton-erreur-chargement" @click="reload">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path d="M32.059 0c8.55.015 16.314 3.385 22.046 8.863l4.608-4.609C60.664 2.304 64 3.685 64 6.444v17.298a3.097 3.097 0 01-3.097 3.097H43.605c-2.759 0-4.14-3.336-2.19-5.287l5.388-5.387a21.52 21.52 0 00-14.61-5.842C20.27 10.22 10.22 19.87 10.322 32.187c.098 11.685 9.572 21.49 21.677 21.49 5.307 0 10.322-1.893 14.275-5.362a1.546 1.546 0 012.112.072l5.117 5.117a1.551 1.551 0 01-.062 2.25A31.882 31.882 0 0132 64C14.327 64 0 49.673 0 32 0 14.348 14.406-.032 32.059 0z" fill="#fff"/>
        </svg>
      </a>
    </div>
    <div class="overlay-action-message">{{ $traduction('situation.erreur_chargement') }}</div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';
import 'commun/styles/action_overlay.scss';
import 'commun/styles/erreur_chargement.scss';

export default {
  methods: {
    reload () {
      window.location.reload();
    }
  }
};
</script>
