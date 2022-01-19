<template>
  <div
    class="mot-conteneur"
  >
    <div
      v-if="mot"
      class="mot">
      {{ lexique[index].mot }}
    </div>
    <img
      v-if="croix"
      :src="$depotRessources.croix().src"
      class="croix"
      >
    <choix-bidirectionnel
      :labelGauche="$traduction('maintenance.francais')"
      :labelDroit="$traduction('maintenance.pas_francais')"
      @actionGauche="enregistreReponse(choixFrancais)"
      @actionDroite="enregistreReponse(choixPasFrancais)"
    />
  </div>
</template>

<script>
import 'maintenance/styles/lexique.scss';

import EvenementIdentificationMot from '../modeles/evenement_identification_mot';
import EvenementApparitionMot from '../modeles/evenement_apparition_mot';

import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

const DELAI_CROIX = 500;

export const choixFrancais = 'francais';
export const choixPasFrancais = 'pasfrancais';

export default {
  components: { ChoixBidirectionnel },

  props: {
    lexique: {
      type: Array,
      required: true
    }
  },

  data: function () {
    return {
      index: -1,
      croix: false,
      mot: false,
      choixFait: null,
      choixFrancais,
      choixPasFrancais
    };
  },

  computed: {
    termine () {
      return this.index === (this.lexique.length - 1);
    }
  },

  mounted () {
    this.prepareMotSuivant();
  },

  methods: {
    enregistreReponse (reponse) {
      if (this.croix) return;

      this.choixFait = reponse;
      this.enregistreJournal(this.choixFait);
      if (this.termine) {
        this.$emit('terminer');
        return;
      }
      this.prepareMotSuivant();
    },

    enregistreJournal (choix) {
      this.$journal.enregistre(
        new EvenementIdentificationMot({
          ...this.lexique[this.index],
          reponse: choix
        })
      );
    },

    prepareMotSuivant () {
      this.affichePointDeFixation();
      setTimeout(() => {
        this.choixFait = null;
        this.afficheMot();
      }, DELAI_CROIX);
    },
    afficheMot () {
      this.index++;
      this.croix = false;
      this.mot = true;
      this.$journal.enregistre(
        new EvenementApparitionMot({ ...this.lexique[this.index] })
      );
    },
    affichePointDeFixation () {
      this.croix = true;
      this.mot = false;
    }
  }
};
</script>
