<template>
  <div class="telephone-conteneur">
    <heure />
    <div class="icones-conteneur icones-conteneur--deverrouiller">
      <div class="icones">
        <div>
          <div
            class="icone icone--deverrouillage icone--deverrouillee"
            :style="{ 'background-image': `url(${$depotRessources.iconeDeverrouillageDebloque().src})` }"
          ></div>
          <span class="label">{{ $traduction('objets_trouves.accueil.deverrouillage') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heure from 'objets_trouves/vues/heure';

export default {
  components: { Heure },

  props: {
    question: {
      type: Object,
      required: true
    }
  }
};
</script>
