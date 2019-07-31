<template>
  <div v-if="estConnecte"
       class="boite-utilisateur">
    <div>{{ nom }}</div>
    <div class="progression-utilisateur">{{ situationsFaites.length }}/{{ situations.length }}</div>
    <a class="deconnexion" href="#" @click.prevent="deconnecte">
      <i class="fas fa-sign-out-alt"></i>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/font_awesome.scss';

export default {
  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites'])
  },
  methods: {
    deconnecte () {
      this.$store.dispatch('deconnecte')
    }
  }
}
</script>
