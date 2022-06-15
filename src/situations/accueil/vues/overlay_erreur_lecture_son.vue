<template>
  <div class="overlay modale">
    <div class="modale-interieur">
      <h2 class="titre-avec-illustration">
        <svg width="80" height="72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.16 26.99c0-.835.27-1.54.808-2.117.537-.546 1.217-.818 2.04-.818.822 0 1.502.272 2.04.817.538.578.806 1.283.806 2.117v19.869c0 .834-.268 1.523-.806 2.068-.538.578-1.218.866-2.04.866-.823 0-1.503-.288-2.04-.866-.538-.545-.807-1.234-.807-2.068V26.989Zm2.895 25.93c1.076 0 1.835.176 2.278.529.443.352.664.978.664 1.876v.914c0 .898-.237 1.523-.712 1.876-.474.353-1.233.53-2.277.53-1.107 0-1.882-.177-2.325-.53-.443-.353-.664-.978-.664-1.876v-.914c0-.93.237-1.572.711-1.925.443-.32 1.218-.48 2.325-.48Z" fill="#1E416A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M74.927 63.6 42.054 6a2.359 2.359 0 0 0-4.108 0L5.073 63.6c-.913 1.6.228 3.6 2.055 3.6h65.744c1.827 0 2.968-2 2.055-3.6Zm-28.763-60c-2.74-4.8-9.588-4.8-12.328 0L.964 61.2C-1.776 66 1.65 72 7.128 72h65.744c5.479 0 8.903-6 6.164-10.8L46.164 3.6Z" fill="#1E416A"/></svg>
        <div class="etiquette-titre">{{ $traduction('situation.erreur_lecture_son.titre') }}</div>
      </h2>
      <div>{{ $traduction('situation.erreur_lecture_son.description') }}</div>
      <div class="overlay-recommandation">{{ $traduction('situation.erreur_lecture_son.action') }}</div>
    </div>
  </div>
</template>

<script>
import 'commun/styles/overlay.scss';

export default {
};
</script>
