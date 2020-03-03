<template>
  <div :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }" class="fond-situation">
    <div class="telephone-conteneur">
      <span class="heure">17:49</span>
      <div class="icones-conteneur">
        <div class="icones">
          <div v-for="icone in icones" :key="icone" class="icone">
            <p class="label">{{ icone }}</p>
          </div>
        </div>
        <div class="icones icones-barre">
          <div v-for="iconeBarre in iconesBarre" :key="iconeBarre" class="icone">
            <p class="label">{{ iconeBarre }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="question">
      <div class="question-barre">
        {{ $traduction('objets_trouves.consigne_accueil_telephone') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'commun/styles/formulaire_qcm.scss';
import 'objets_trouves/styles/acte.scss';

export default {
  computed: {
    ...mapState(['etat', 'fondSituation'])
  },
  data () {
    return {
      icones: ['Photos', 'Répondeur'],
      iconesBarre: ['Rappels', 'Agenda', 'Messages']
    };
  }
};
</script>
