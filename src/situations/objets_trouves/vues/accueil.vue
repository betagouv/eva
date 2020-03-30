<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <div class="telephone-conteneur">
      <heure />
      <div class="icones-conteneur">
        <div class="icones">
          <icone-app
            v-for="(question, app) in apps"
            :key="app"
            :apps="apps"
            :app="app"
            :desactivee="appDesactivee(app)"
            @click.native="afficheApp(app)"
          />
        </div>
      </div>
    </div>
    <div class="question">
      <div class="question-barre" v-html="consigneEcranAccueil">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import 'commun/styles/formulaire_qcm.scss';
import 'objets_trouves/styles/acte.scss';
import IconeApp from './icone_app';
import Heure from './heure';

export default {
  components: { Heure, IconeApp },

  computed: {
    ...mapState(['appsVisitees', 'apps', 'consigneEcranAccueil']),
    appDesactivee () {
      return (app) => this.appsVisitees.includes(app);
    }
  },

  methods: mapMutations(['afficheApp'])
};
</script>
