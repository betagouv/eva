<template>
  <div
    v-if="estConnecte"
    class="boite-utilisateur"
  >
    <div
      :style="{ width: pourcentProgression }"
      class="progression"
    />
    <div class="contenu">
      <div>{{ nom }}</div>
      <div class="progression-actions">
        <div class="progression-utilisateur">{{ situationsFaites.length }}/{{ situations.length }}</div>
        <a
          class="deconnexion"
          href="#"
          @click.prevent="deconnecte"
        >
          <img :src="signOutIcon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import signOutIcon from '../assets/sign_out.svg';
import 'commun/styles/boite_utilisateur.scss';

export default {
  data () {
    return {
      signOutIcon
    };
  },

  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites']),

    pourcentProgression () {
      return `${this.situationsFaites.length * 100 / this.situations.length}%`;
    }
  },

  methods: mapActions(['deconnecte'])
};
</script>
