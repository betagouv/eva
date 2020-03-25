<template>
  <div class="ecran-verouille-conteneur">
    <div class="deverouillage"></div>
    <div
      class="enigme-conteneur"
      v-if='ecranEnigme'
    >
      <p>{{ $traduction('objets_trouves.verouillage.indice') }}</p>
      <p class='intitule'>{{ $traduction('objets_trouves.verouillage.intitule') }}</p>
    </div>
    <div
      class="icones-conteneur"
      v-else
      >
      <div class="icones">
        <icone-app
          :key="app"
          :app="app"
          :desactivee='false'
          @click.native="afficheApp(app)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import IconeApp from './icone_app';

export default {
  props: {
    app: {
      type: String,
      required: true
    }
  },

  components: { IconeApp },
  computed: {
    ...mapState(['appsVisitees', 'apps', 'etat', 'afficheEcranVerrouillage'])
  },

  data () {
    return {
      ecranEnigme: false
    };
  },

  methods: mapMutations(['afficheApp'])
};
</script>
