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
            v-for="icone in icones"
            :key="icone"
            :app="icone"
            :desactivee="iconeDesactivee(icone)"
            @click.native="afficheAppli(icone)"
          />
        </div>
        <div class="icones icones-barre">
          <icone-app
            v-for="icone in iconesBarre"
            :key="icone"
            :app="icone"
            :desactivee="iconeDesactivee(icone)"
            @click.native="afficheAppli(icone)"
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

  data () {
    return {
      icones: ['photos', 'repondeur'],
      iconesBarre: ['rappels', 'agenda', 'messages']
    };
  },

  computed: {
    ...mapState(['appsVisitees']),
    iconeDesactivee () {
      return (icone) => this.appsVisitees.includes(icone);
    }
  },

  methods: mapMutations(['afficheAppli'])
};
</script>
