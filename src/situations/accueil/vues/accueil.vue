<template>
  <div class="conteneur">
    <div
      v-if="!afficheConsigne"
      class="titre">
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
        v-if="!afficheConsigne"
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
    <div class="actions-accueil">
      <div
        :class="{ desactivee: precedentDesactivee }"
        class="bouton-et-etiquette"
        @click="indexBatiment--"
      >
        <button
          :disabled="precedentDesactivee"
          class="fleche-navigation-situation"
         >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="17" fill="white"/>
            <path fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36ZM7.93934 19.0607L17.4853 28.6066C18.0711 29.1924 19.0208 29.1924 19.6066 28.6066C20.1924 28.0208 20.1924 27.0711 19.6066 26.4853L12.6213 19.5H27C27.8284 19.5 28.5 18.8284 28.5 18C28.5 17.1716 27.8284 16.5 27 16.5H12.6213L19.6066 9.51472C20.1924 8.92893 20.1924 7.97919 19.6066 7.3934C19.0208 6.80761 18.0711 6.80761 17.4853 7.3934L7.93934 16.9393C7.35355 17.5251 7.35355 18.4749 7.93934 19.0607Z"
                  fill="#6E84FE"
            />
          </svg>
        </button>
        <span class="bouton-arrondi bouton-arrondi--blanc">
          {{ $traduction('accueil.precedent') }}
        </span>
      </div>
        <acces-situation
          v-if="afficheBoutonSituation"
          :situation="batiments[indexBatiment]"
          class="bouton-arrondi bouton-commence-situation"
        />
      <div
        :class="{ desactivee: suivantDesactivee }"
        class="bouton-et-etiquette gauche"
        @click="indexBatiment++"
      >
        <button
          :disabled="suivantDesactivee"
          :class="{ desactivee: suivantDesactivee }"
          class="fleche-navigation-situation"
         >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="17" fill="white"/>
            <path fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18 1.57361e-06C8.05887 2.44269e-06 -2.44269e-06 8.05888 -1.57361e-06 18C-7.04529e-07 27.9411 8.05887 36 18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 7.04529e-07 18 1.57361e-06ZM28.0607 16.9393L18.5147 7.3934C17.9289 6.80761 16.9792 6.80761 16.3934 7.3934C15.8076 7.97918 15.8076 8.92893 16.3934 9.51472L23.3787 16.5L9 16.5C8.17157 16.5 7.5 17.1716 7.5 18C7.5 18.8284 8.17157 19.5 9 19.5L23.3787 19.5L16.3934 26.4853C15.8076 27.0711 15.8076 28.0208 16.3934 28.6066C16.9792 29.1924 17.9289 29.1924 18.5147 28.6066L28.0607 19.0607C28.6464 18.4749 28.6464 17.5251 28.0607 16.9393Z"
                  fill="#6E84FE"
            />
          </svg>
        </button>
        <span class="bouton-arrondi bouton-arrondi--blanc">
          {{ $traduction('accueil.suivant') }}
        </span>
      </div>
    </div>
    <formulaire-identification :force-campagne="forceCampagne" :force-nom="forceNom" />
    <transition-fade>
      <intro-consigne
        v-if="afficheConsigne"
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
import { mapState, mapGetters, mapActions } from 'vuex';
import 'accueil/styles/accueil.scss';
import 'commun/styles/cadre.scss';
import 'commun/styles/actions.scss';
import 'commun/styles/boutons.scss';
import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';
import logo from '../../../public/logo-blanc.svg';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
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
  components: { BoiteUtilisateur, FormulaireIdentification, AccesSituation, IntroConsigne, Fin, TransitionFade },

  props: {
    forceCampagne: {
      type: String,
      required: false
    },
    forceNom: {
      type: String,
      required: false
    }
  },

  data () {
    const { indexPrecedent } = this.recupereEtatDuPrecedentChargement();

    return {
      logo,
      altLogo: traduction('alt-logo'),
      fondAccueil: `url(${this.$depotRessources.fondAccueil().src})`,
      personnage: this.$depotRessources.personnage().src,
      indexBatiment: indexPrecedent,
      ecranFinAfficher: false,
      annonceGenerale: process.env.ANNONCE_GENERALE
    };
  },

  computed: {
    ...mapState(['situations', 'estConnecte', 'situationsFaites', 'nomCampagne']),
    ...mapGetters(['estDemarre', 'estTermine']),

    afficheConsigne () {
      return this.estDemarre && this.indexBatiment === 0;
    },

    positionFond () {
      return (this.indexBatiment) * 20;
    },

    precedentDesactivee () {
      return this.indexBatiment === 0;
    },

    suivantDesactivee () {
      return this.indexBatiment === this.niveauMax;
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
  },

  mounted () {
    if (this.forceCampagne) {
      this.deconnecte();
    }
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
    ...mapActions(['deconnecte']),

    recupereSituations (syncIndexBatiment = true) {
      if (!this.estConnecte) return;
      this.$store.dispatch('recupereSituations')
        .finally(() => {
          if (syncIndexBatiment) {
            setTimeout(this.glisseVersDernierBatimentNonVisite, 100);
          }
        });
    },

    glisseVersDernierBatimentNonVisite () {
      this.indexBatiment = this.niveauMax;

      if(this.estTermine) {
        this.$store.dispatch('termineEvaluation');
      }
    },

    reinitialiseDonnees () {
      this.indexBatiment = -0.5;
      this.ecranFinAfficher = false;
    },

    decalageGaucheBatiment (index) {
      return DECALAGE_INITIAL + index * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    },

    decalageGaucheVue (index) {
      return (index) * (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
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
