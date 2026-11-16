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
      @click.prevent="demandeDeconnexion"
    >
      <img :src="iconeDeconnexion" />
    </a>
    <teleport to="#accueil">
      <div
        v-if="confirmationDeconnexion"
        class="overlay modale confirmation-deconnexion"
      >
        <div class="modale-interieur">
          <h2 v-html="$traduction('abandon.confirmation')" />
          <div class="buttons">
            <button
              class="fr-btn confirme-bouton"
              @click="deconnexion"
            >{{ $traduction('abandon.oui') }}</button>
            <button
              class="fr-btn fr-btn--rouge annulation-deconnexion"
              @click="annuleDeconnexion"
            >{{ $traduction('abandon.non') }}</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import 'commun/styles/boite_utilisateur.scss';
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';

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
