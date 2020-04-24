<template>
  <div class="telephone-conteneur">
    <heure />
    <div class="indice">
      <strong class="indice-titre">{{ $traduction('objets_trouves.verrouillage.indice_titre') }}</strong>
      <p class="indice-texte">{{ $traduction('objets_trouves.verrouillage.indice_texte') }}</p>
    </div>
    <div class="icones-conteneur icones-conteneur--deverrouiller">
      <div class="icones">
        <div>
          <div
            class="icone icone--deverrouillage icone--deverrouillee"
            :style="{ 'background-image': `url(${$depotRessources.iconeDeverrouillageDebloque().src})` }"
          />
          <span class="label">{{ $traduction('objets_trouves.accueil.deverrouillage') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heure from 'objets_trouves/vues/heure';

export default {
  components: { Heure }

};
</script>
