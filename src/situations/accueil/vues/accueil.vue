<template>
  <div id="accueil">
    <div class="titre">
      <h1>Compétences pro</h1>
      <boite-utilisateur />
    </div>
    <div class="conteneur">
      <div
        :style="{ 'background-image': fondAccueil, 'background-position-x': `${positionFond}%` }"
        class="scene"
      >

        <img
          :src="punaise"
          class="punaise"
        />

        <img
          :src="personnage"
          class="personnage"
        />

        <div
          :style="{ left: `${-decalageGaucheVue(indexBatiment)}px`}"
          class="acces-situations">
          <acces-situation
            v-for="(situation, index) in batiments"
            :key="situation.identifiant"
            :situation="situation"
            :style="{ left: `${decalageGaucheBatiment(index)}px`}"
            :desactivee="indexBatiment !== index"
           />
        </div>
      </div>
      <div class="actions">
        <div
          :class="{ desactivee: precedentDesactivee}"
          class="bouton-et-etiquette"
        >
          <button
            :disabled="precedentDesactivee"
            class="bouton-mission"
            @click="indexBatiment--"
           >
            <img :src="precedent">
          </button>
          <span>{{ traduction('accueil.precedent') }}</span>
        </div>
        <a
          v-if="situationActuelle"
          :href="situationActuelle.chemin"
          class="bouton-arrondi"
        >
          {{ traduction('accueil.commencer', { situation: situationActuelle.nom }) }}
        </a>
        <button
          v-else-if="termine"
          class="bouton-arrondi"
          @click="afficheEcranFin"
        >
          {{ traduction('accueil.conclure') }}
        </button>
        <div
          :class="{ desactivee: suivantDesactivee}"
          class="bouton-et-etiquette gauche"
        >
          <button
            :disabled="suivantDesactivee"
            class="bouton-mission"
            @click="indexBatiment++"
           >
            <img :src="suivant">
          </button>
          <span>{{ traduction('accueil.suivant') }}</span>
        </div>
      </div>
      <formulaire-identification :force-campagne="forceCampagne" />
      <transition-fade>
        <overlay-intro
          v-if="estConnecte && indexBatiment === 0"
          @passe="passeIntro"
        />
      </transition-fade>
      <transition-fade>
        <fin v-if="ecranFinAfficher" />
      </transition-fade>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'accueil/styles/accueil.scss';
import 'commun/styles/cadre.scss';
import 'commun/styles/actions.scss';
import 'commun/styles/bouton.scss';
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';
import FormulaireIdentification from './formulaire_identification';
import AccesSituation from 'accueil/vues/acces_situation';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import Fin from 'accueil/vues/fin';
import OverlayIntro from 'accueil/vues/overlay_intro';
import TransitionFade from 'commun/vues/transition_fade';

const LARGEUR_SCENE = 1008;
const LARGEUR_BATIMENT = 411;
const DECALAGE_INITIAL = LARGEUR_SCENE / 2 - LARGEUR_BATIMENT / 2;
const ESPACEMENT_BATIMENT = (LARGEUR_SCENE - 1.5 * LARGEUR_BATIMENT) / 2;

export const CLE_ETAT_ACCUEIL = 'etatAccueil';

export default {
  components: { FormulaireIdentification, AccesSituation, BoiteUtilisateur, OverlayIntro, Fin, TransitionFade },

  data() {
    const parsedUrl = new URL(window.location.href);
    const { indexPrecedent } = this.recupereEtatDuPrecedentChargement();
    return {
      fondAccueil: `url(${this.depotRessources.fondAccueil().src})`,
      personnage: this.depotRessources.personnage().src,
      precedent: this.depotRessources.precedent().src,
      suivant: this.depotRessources.suivant().src,
      punaise: this.depotRessources.punaise().src,
      forceCampagne: parsedUrl.searchParams.get('code') || '',
      indexBatiment: indexPrecedent,
      ecranFinAfficher: false
    };
  },

  computed: {
    ...mapState(['situations', 'estConnecte', 'situationsFaites']),

    positionFond () {
      return (this.indexBatiment) * 80;
    },

    precedentDesactivee () {
      return this.indexBatiment === 0;
    },

    suivantDesactivee () {
      return this.indexBatiment === this.niveauMax;
    },

    situationActuelle () {
      if (this.situations.length === 0 || this.termine || this.indexBatiment < 1)
        return null;
      return this.situations[this.indexBatiment - 1];
    },

    termine () {
      return this.indexBatiment === this.batiments.length - 1;
    },

    batiments () {
      return [
        {
          identifiant: 'bienvenue',
          nom: 'Bienvenue'
        },
        ...this.situations,
        {
          identifiant: 'fin',
          nom: 'Terminer'
        }
      ]
    },

    niveauMax () {
      return this.situationsFaites.length + 1;
    }
  },

  mounted () {
    this.synchroniseSituations();
  },

  watch: {
    estConnecte () {
      this.synchroniseSituations(false);
      if (!this.estConnecte) {
        this.reinitialiseDonnees();
      } else {
        this.indexBatiment = 0;
      }
    },

    indexBatiment () {
      this.sauvegardeEtatPourProchainChargement();
    }
  },

  methods: {
    synchroniseSituations (sync = true) {
      if (!this.estConnecte) return;
      this.$store.dispatch('synchroniseSituations')
        .then(() => {
          if (sync) {
            this.indexBatiment = this.niveauMax;
          }
        });
    },

    reinitialiseDonnees () {
      this.indexBatiment = -0.5;
      this.ecranFinAfficher = false;
    },

    decalageGaucheBatiment (index) {
      return DECALAGE_INITIAL + index * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    decalageGaucheVue (niveau) {
      return (niveau) * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    sauvegardeEtatPourProchainChargement () {
      window.localStorage.setItem(CLE_ETAT_ACCUEIL, JSON.stringify({
        indexPrecedent: this.indexBatiment
      }));
    },

    recupereEtatDuPrecedentChargement () {
      const etatPrecedent = window.localStorage.getItem(CLE_ETAT_ACCUEIL);
      if (!etatPrecedent) return { indexPrecedent: -0.5 };
      return JSON.parse(etatPrecedent);
    },

    passeIntro () {
      this.indexBatiment++;
    },

    afficheEcranFin () {
      this.ecranFinAfficher = true;
    }
  }
}
</script>
