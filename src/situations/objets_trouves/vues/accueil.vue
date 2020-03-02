<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <span class="heure">17H49</span>
     <div class="icones">
       <div v-for="icone in icones" :key="icone" class="icone">
         <p class='label'>{{ icone }}</p>
       </div>
     </div>
    <div class="question">
      <div class="question-barre">
        Vous allez maintenant pouvoir commencer à chercher Sophie en utilisant les indices que vous trouverez dans son téléphone. Pensez à regarder ses messages texte et ses messages vocaux, ses photographies, ainsi que son agenda. Pensez à bien noter lorsque l'heure est indiquée.
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
      icones: ['Photos', 'Répondeur', 'Rappels', 'Agenda', 'Messages']
    };
  }
};
</script>
