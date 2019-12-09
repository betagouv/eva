<template>
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
          :affiche-fond="true"
          class="acces-situation"
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
          class="bouton-navigation-situation"
          @click="indexBatiment--"
         >
          <img :src="precedent">
        </button>
        <span>{{ $traduction('accueil.precedent') }}</span>
      </div>
      <acces-situation
        v-if="afficheBoutonSituation"
        :situation="batiments[indexBatiment]"
        class="bouton-arrondi"
      />
      <div
        :class="{ desactivee: suivantDesactivee}"
        class="bouton-et-etiquette gauche"
      >
        <button
          :disabled="suivantDesactivee"
          class="bouton-navigation-situation"
          @click="indexBatiment++"
         >
          <img :src="suivant">
        </button>
        <span>{{ $traduction('accueil.suivant') }}</span>
      </div>
    </div>
    <formulaire-identification :force-campagne="forceCampagne" :force-nom="forceNom" />
    <transition-fade>
      <intro-consigne
        v-if="estConnecte && indexBatiment === 0"
        :titre="$traduction('accueil.intro_consigne.titre')"
        identifiant-situation="accueil"
        titre-consigne=""
        @consigne-fini="finiIntro"
      />
    </transition-fade>
    <transition-fade>
      <fin v-if="ecranFinAfficher" />
    </transition-fade>
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
import Fin from 'accueil/vues/fin';
import IntroConsigne from 'commun/vues/intro_consigne';
import TransitionFade from 'commun/vues/transition_fade';
import { traduction } from 'commun/infra/internationalisation';

const LARGEUR_SCENE = 1008;
export const LARGEUR_BATIMENT = 411;
export const DECALAGE_INITIAL = LARGEUR_SCENE / 2 - LARGEUR_BATIMENT / 2;
export const ESPACEMENT_BATIMENT = (LARGEUR_SCENE - 1.5 * LARGEUR_BATIMENT) / 2;

export const CLE_ETAT_ACCUEIL = 'etatAccueil';

export default {
  components: { FormulaireIdentification, AccesSituation, IntroConsigne, Fin, TransitionFade },

  data () {
    const parsedUrl = new URL(window.location.href);
    const { indexPrecedent } = this.recupereEtatDuPrecedentChargement();
    return {
      fondAccueil: `url(${this.$depotRessources.fondAccueil().src})`,
      personnage: this.$depotRessources.personnage().src,
      precedent: this.$depotRessources.precedent().src,
      suivant: this.$depotRessources.suivant().src,
      punaise: this.$depotRessources.punaise().src,
      forceCampagne: parsedUrl.searchParams.get('code') || '',
      forceNom: parsedUrl.searchParams.get('nom') || '',
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

    termine () {
      return this.indexBatiment === this.batiments.length - 1;
    },

    batiments () {
      const situations = this.situations.map(({ nom, chemin, identifiant }) => {
        return {
          nom: traduction('accueil.commencer', { situation: nom }),
          chemin,
          identifiant
        };
      });
      return [
        {
          identifiant: 'bienvenue',
          nom: ''
        },
        ...situations,
        {
          identifiant: 'fin',
          nom: traduction('accueil.conclure'),
          action: this.afficheEcranFin
        }
      ];
    },

    niveauMax () {
      return this.situationsFaites.length + 1;
    },

    afficheBoutonSituation () {
      const batiment = this.batiments[this.indexBatiment];
      return batiment && (batiment.action || batiment.chemin);
    }
  },

  mounted () {
    this.synchroniseEvaluation();
  },

  watch: {
    estConnecte () {
      this.synchroniseEvaluation(false);
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
    synchroniseEvaluation (sync = true) {
      if (!this.estConnecte) return;
      this.$store.dispatch('synchroniseEvaluation')
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

    finiIntro () {
      this.indexBatiment++;
    },

    afficheEcranFin () {
      this.ecranFinAfficher = true;
    }
  }
};
</script>
