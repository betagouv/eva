<template>
  <div class="conteneur">
    <div class="titre">
      <img class="logo" :alt="altLogo" :src="logo"/>
      <div class="titre-campagne"><span>Campagne :</span> {{ nomCampagne }}</div>
      <boite-utilisateur />
    </div>
    <div class="annonce">
      <p class="annonce-description" v-if="annonceGenerale">{{ annonceGenerale }}</p>
    </div>
    <div
      :style="{ 'background-image': fondAccueil, 'background-position-x': `${positionFond}%` }"
      class="scene"
    >

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
        :class="{ desactivee: precedentDesactivee }"
        class="bouton-et-etiquette"
        @click="indexBatiment--"
      >
        <button
          :disabled="precedentDesactivee"
          class="bouton-navigation-situation"
         >
          <img :src="precedent">
        </button>
        <span>{{ $traduction('accueil.precedent') }}</span>
      </div>
      <div>
        <acces-situation
          v-if="afficheBoutonSituation"
          :situation="batiments[indexBatiment]"
          class="bouton-arrondi"
        />
      </div>
      <div
        :class="{ desactivee: suivantDesactivee }"
        class="bouton-et-etiquette gauche"
        @click="indexBatiment++"
      >
        <button
          :disabled="suivantDesactivee"
          class="bouton-navigation-situation"
         >
          <img :src="suivant">
        </button>
        <span>{{ $traduction('accueil.suivant') }}</span>
      </div>
    </div>
    <formulaire-identification :force-campagne="forceCampagne" :force-nom="forceNom" />
    <transition-fade>
      <formulaire-contact v-if="estContact" />
    </transition-fade>
    <transition-fade>
      <intro-consigne
        v-if="estDemarre && indexBatiment === 0"
        :titre="$traduction('accueil.intro_consigne.titre')"
        identifiant-situation="accueil"
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
import queryString from 'query-string';
import 'accueil/styles/accueil.scss';
import 'commun/styles/cadre.scss';
import 'commun/styles/actions.scss';
import 'commun/styles/bouton.scss';
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';
import logo from '../../../public/logo-blanc.svg';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import FormulaireIdentification from './formulaire_identification';
import FormulaireContact from './formulaire_contact';
import AccesSituation from 'accueil/vues/acces_situation';
import Fin from 'accueil/vues/fin';
import IntroConsigne from 'commun/vues/intro_consigne';
import TransitionFade from 'commun/vues/transition_fade';
import { traduction } from 'commun/infra/internationalisation';
import { CONTACT, DEMARRE } from '../modeles/store';

const LARGEUR_SCENE = 1008;
export const LARGEUR_BATIMENT = 411;
export const DECALAGE_INITIAL = LARGEUR_SCENE / 2 - LARGEUR_BATIMENT / 2;
export const ESPACEMENT_BATIMENT = (LARGEUR_SCENE - 1.5 * LARGEUR_BATIMENT) / 2;

export const CLE_ETAT_ACCUEIL = 'etatAccueil';

export default {
  components: { BoiteUtilisateur, FormulaireIdentification, FormulaireContact, AccesSituation, IntroConsigne, Fin, TransitionFade },

  data () {
    const parametresUrl = queryString.parse(location.search);
    const { indexPrecedent } = this.recupereEtatDuPrecedentChargement();

    return {
      logo,
      altLogo: traduction('alt-logo'),
      fondAccueil: `url(${this.$depotRessources.fondAccueil().src})`,
      personnage: this.$depotRessources.personnage().src,
      precedent: this.$depotRessources.precedent().src,
      suivant: this.$depotRessources.suivant().src,
      forceCampagne: parametresUrl.code || '',
      forceNom: parametresUrl.nom || '',
      indexBatiment: indexPrecedent,
      ecranFinAfficher: false,
      annonceGenerale: process.env.ANNONCE_GENERALE
    };
  },

  computed: {
    ...mapState(['situations', 'estConnecte', 'situationsFaites', 'etat', 'nomCampagne']),

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
          identifiant: 'accueil',
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
    },

    estDemarre () {
      return this.etat === DEMARRE;
    },

    estContact () {
      return this.etat === CONTACT;
    }
  },

  mounted () {
    this.recupereSituations();
  },

  watch: {
    estConnecte () {
      if (!this.estConnecte) {
        this.reinitialiseDonnees();
      } else {
        this.recupereSituations(false);
        this.indexBatiment = 0;
      }
    },

    indexBatiment () {
      this.sauvegardeEtatPourProchainChargement();
    }
  },

  methods: {
    recupereSituations (syncIndexBatiment = true) {
      if (!this.estConnecte) return;
      this.$store.dispatch('recupereSituations')
        .finally(() => {
          if (syncIndexBatiment) {
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
