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
        <a class="deconnexion" href="#" @click.prevent="deconnecte">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';

export default {
  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites']),

    pourcentProgression () {
      return `${this.situationsFaites.length * 100 / this.situations.length}%`;
    }
  },

  methods: mapActions(['deconnecte'])
};
</script>
