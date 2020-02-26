<template>
  <div
    v-if="estConnecte && !confirmationDeconnexion"
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
          :title="$traduction('deconnexion.titre')"
          class="deconnexion"
          href="#"
          @click.prevent="demandeDeconnexion"
        >
          <img :src="signOutIcon" />
        </a>
      </div>
    </div>
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
import signOutIcon from '../assets/sign_out.svg';
import 'commun/styles/boite_utilisateur.scss';

export default {
  data () {
    return {
      signOutIcon,
      confirmationDeconnexion: false
    };
  },

  computed: {
    ...mapState(['estConnecte', 'nom', 'situations', 'situationsFaites']),

    pourcentProgression () {
      return `${this.situationsFaites.length * 100 / this.situations.length}%`;
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
