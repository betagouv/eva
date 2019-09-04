<template>
  <div id="accueil">
    <div class="titre">
      <h1>Compétences pro</h1>
      <boite-utilisateur />
    </div>
    <div
      :style="{ 'background-image': fondAccueil, 'background-position-x': `${positionFond}%` }"
      class="accueil-scene"
    >

      <img
        :src="personnage"
        class="personnage"
      />

      <div
        :style="{ transform: `translateX(${-decalageGaucheVue(indexBatiment)}px)`}"
        class="acces-situations">
        <acces-situation
          v-for="(situation, index) in situations"
          :key="situation.identifiant"
          :situation="situation"
          :style="{ left: `${decalageGaucheBatiment(index)}px`}"
         />
      </div>

      <formulaire-identification :force-campagne="forceCampagne" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';
import AccesSituation from 'accueil/vues/acces_situation';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';

const LARGEUR_SCENE = 1008;
const LARGEUR_BATIMENT = 411;
const DECALAGE_INITIAL = LARGEUR_SCENE / 2 - LARGEUR_BATIMENT / 2;
const ESPACEMENT_BATIMENT = (LARGEUR_SCENE - 1.5 * LARGEUR_BATIMENT) / 2;

export const CLE_NIVEAU_PRECEDENT = 'niveauPrecedent';

export default {
  components: { FormulaireIdentification, AccesSituation, BoiteUtilisateur },

  data() {
    const parsedUrl = new URL(window.location.href);
    return {
      fondAccueil: `url(${this.depotRessources.fondAccueil().src})`,
      personnage: this.depotRessources.personnage().src,
      forceCampagne: parsedUrl.searchParams.get('code') || '',
      indexBatiment: this.recupereNiveauDuPrecedentChargement()
    };
  },

  computed: {
    ...mapState(['situations', 'estConnecte']),
    ...mapGetters(['niveauActuel']),

    positionFond () {
      return (this.indexBatiment - 1) * 30;
    }
  },

  mounted () {
    this.synchroniseSituations();
    this.sauvegardeNiveauPourProchainChargement();
  },

  watch: {
    estConnecte () {
      this.synchroniseSituations();
    }
  },

  methods: {
    synchroniseSituations () {
      if (!this.estConnecte) return;
      this.$store.dispatch('synchroniseSituations')
        .then(() => this.indexBatiment = this.niveauActuel );
    },

    decalageGaucheBatiment (index) {
      return DECALAGE_INITIAL + index * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    decalageGaucheVue (niveau) {
      return (niveau - 1) * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    sauvegardeNiveauPourProchainChargement () {
      window.localStorage.setItem(CLE_NIVEAU_PRECEDENT, this.niveauActuel);
    },

    recupereNiveauDuPrecedentChargement () {
      const precedentNiveau = window.localStorage.getItem(CLE_NIVEAU_PRECEDENT);
      return parseInt(precedentNiveau);
    }
  }
}
</script>
