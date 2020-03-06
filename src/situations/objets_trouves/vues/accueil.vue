<template>
  <div
    :style="{ 'background-image': `url(${$depotRessources.fondSituation().src})` }"
    class="fond-situation"
  >
    <div class="telephone-conteneur">
      <span class="heure">17:49</span>
      <div class="icones-conteneur">
        <div class="icones">
          <icone-app
            v-for="(question, app) in apps"
            :key="app"
            :app="app"
            :desactivee="appDesactivee(app)"
            @click.native="afficheApp(app)"
          />
        </div>
      </div>
    </div>
    <div class="question">
      <div class="question-barre">
        {{ $traduction('objets_trouves.accueil.consigne') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import 'commun/styles/formulaire_qcm.scss';
import 'objets_trouves/styles/acte.scss';
import IconeApp from './icone_app';

export default {
  components: { IconeApp },

  computed: {
    ...mapState(['appsVisitees', 'apps']),
    appDesactivee () {
      return (app) => this.appsVisitees.includes(app);
    }
  },

  methods: mapMutations(['afficheApp'])
};
</script>
