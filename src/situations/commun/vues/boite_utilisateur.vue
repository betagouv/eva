<template>
  <div
    v-if="estConnecte"
    class="boite-utilisateur"
  >
    <div class="progression-conteneur">
      <div
        :style="{ width: pourcentProgression }"
        class="progression"
      />
      <div class="contenu">
        <div>{{ nom }}</div>
        <div class="progression-actions">
          <div class="progression-utilisateur">{{ situationsFaites.length }}/{{ situations.length }}</div>
        </div>
      </div>
    </div>
    <a
      :title="$traduction('deconnexion.titre')"
      class="deconnexion"
      href="#"
      @click.prevent="$emit('demande-deconnexion')"
    >
      <img :src="iconeDeconnexion" />
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'commun/styles/boite_utilisateur.scss';

export default {
  emits: ['demande-deconnexion'],

  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites']),

    pourcentProgression () {
      return `${this.situationsFaites.length * 100 / this.situations.length}%`;
    },
    iconeDeconnexion: function () {
      return this.$depotRessources.iconeDeconnexion().src;
    }
  }
};
</script>
