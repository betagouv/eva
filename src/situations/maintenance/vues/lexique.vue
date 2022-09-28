<template>
  <div
    class="mot-conteneur"
  >
    <div
      v-if="mot"
      class="mot">
      {{ motCourant.mot }}
    </div>
    <img
      v-if="croix"
      :src="$depotRessources.croix().src"
      class="croix"
      >
    <choix-bidirectionnel
      :labelGauche="$traduction('maintenance.francais')"
      :labelDroit="$traduction('maintenance.pas_francais')"
      :desactive="termine"
      @actionGauche="enregistreReponse('francais')"
      @actionDroite="enregistreReponse('pasfrancais')"
    />
  </div>
</template>

<script>
import 'maintenance/styles/lexique.scss';

import EvenementIdentificationMot from '../modeles/evenement_identification_mot';
import EvenementApparitionMot from '../modeles/evenement_apparition_mot';

import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

const DELAI_POINT_FIXATION = 500;

export default {
  components: { ChoixBidirectionnel },
  emits: ['terminer'],

  props: {
    lexique: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      index: -1,
      croix: false,
      mot: false
    };
  },

  computed: {
    termine () {
      return this.index === this.lexique.length;
    },

    motCourant () {
      return this.lexique[this.index];
    }
  },

  mounted () {
    this.prepareMotSuivant();
  },

  watch: {
    termine(termine) {
      if (termine) {
        this.$emit('terminer');
      }
    }
  },

  methods: {
    enregistreReponse (reponse) {
      this.enregistreJournal(
        new EvenementIdentificationMot({
          ...this.motCourant,
          reponse
        })
      );
      this.prepareMotSuivant();
    },

    enregistreJournal (evenement) {
      if(!this.termine) this.$journal.enregistre(evenement);
    },

    prepareMotSuivant () {
      this.index++;
      this.affichePointDeFixation();
      setTimeout(this.afficheMot, DELAI_POINT_FIXATION);
    },

    afficheMot () {
      this.croix = false;
      this.mot = true;
      this.enregistreJournal(
        new EvenementApparitionMot(this.motCourant)
      );
    },

    affichePointDeFixation () {
      this.croix = true;
      this.mot = false;
    }
  }
};
</script>
