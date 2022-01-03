<template>
  <div
    v-if="estConnecte && !confirmationDeconnexion"
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
      @click.prevent="demandeDeconnexion"
    >
      <img :src="iconeDeconnexion" />
    </a>
  </div>
  <div
    v-else-if="confirmationDeconnexion"
    class="confirmation-deconnexion"
  >
    {{ $traduction('deconnexion.confirmation') }}
    <button
      class="bouton-arrondi bouton-arrondi--petit confirme-bouton"
      @click="deconnexion"
    >
     {{ $traduction('deconnexion.oui') }}
    </button>
    <a
      class="annulation-deconnexion"
      href="#"
      @click.prevent="annuleDeconnexion"
    >{{ $traduction('deconnexion.non') }}</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import 'commun/styles/boite_utilisateur.scss';

export default {
  data () {
    return {
      confirmationDeconnexion: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites']),

    pourcentProgression () {
      return `${this.situationsFaites.length * 100 / this.situations.length}%`;
    },
    iconeDeconnexion: function () {
      return this.$depotRessources.iconeDeconnexion().src;
    }
  },

  methods: {
    ...mapActions(['deconnecte']),

    demandeDeconnexion () {
      this.confirmationDeconnexion = true;
    },

    annuleDeconnexion () {
      this.confirmationDeconnexion = false;
    },

    deconnexion () {
      this.annuleDeconnexion();
      this.deconnecte();
    }
  }
};
</script>
