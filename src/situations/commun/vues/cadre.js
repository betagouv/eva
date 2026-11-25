import 'commun/styles/cadre.scss';
import {
  CHARGEMENT,
  ERREUR_CHARGEMENT,
  ATTENTE_DEMARRAGE,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI,
  ERREUR_ENREGISTREMENT,
  RELANCE_ENREGISTREMENT,
  ERREUR_ENREGISTREMENT_ABANDON,
  RELANCE_ENREGISTREMENT_ABANDON,
  RETOUR_ACCUEIL,
  STOPPEE,
  CHANGEMENT_ETAT
} from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import EvenementFinSituation from 'commun/modeles/evenement_fin_situation';
import EvenementAbandon from 'commun/modeles/evenement_abandon';
import EvenementEntrainementDemarrage from 'commun/modeles/evenement_entrainement_demarrage';
import VueActions from 'commun/vues/actions';
import VueStop from 'commun/vues/stop';
import { creeAdaptateur } from './adaptateur_vue';
import OverlayAttente from './overlay_attente';
import OverlayErreurChargement from './overlay_erreur_chargement';
import OverlayErreurEnregistrement from './overlay_erreur_enregistrement';
import AdaptateurConsigne from 'commun/vues/adaptateur_consigne';
import VueTerminer from 'commun/vues/terminer';
import { SCOPE_URL } from 'commun/vues/affiche_situation';

const DUREE_MINIMALE_TEST_CONNEXION = 1500;

export default class VueCadre {
  constructor(VueSituation, situation, journal, depotRessources, store,
    retourAccueil = () => window.location.assign(SCOPE_URL),
    dureeMinimaleTestConnexion = DUREE_MINIMALE_TEST_CONNEXION) {
    this.retourAccueil = retourAccueil;
    this.dureeMinimaleTestConnexion = dureeMinimaleTestConnexion;
    this.VueSituation = VueSituation;
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.store = store;
    this.vuesEtats = new Map();
    this.vuesEtats.set(CHARGEMENT, creeAdaptateur(OverlayAttente, { raison: 'chargement' }));
    this.vuesEtats.set(ERREUR_CHARGEMENT, creeAdaptateur(OverlayErreurChargement));
    this.vuesEtats.set(ATTENTE_DEMARRAGE, AdaptateurConsigne);
    this.vuesEtats.set(ENTRAINEMENT_FINI, AdaptateurConsigne);
    this.vuesEtats.set(FINI, creeAdaptateur(OverlayAttente, { raison: 'enregistrement' }));
    this.vuesEtats.set(ERREUR_ENREGISTREMENT, creeAdaptateur(OverlayErreurEnregistrement, {
      relance: () => this.situation.modifieEtat(RELANCE_ENREGISTREMENT)
    }));
    this.vuesEtats.set(RELANCE_ENREGISTREMENT, creeAdaptateur(OverlayAttente, { raison: 'enregistrement' }));
    this.vuesEtats.set(STOPPEE, creeAdaptateur(OverlayAttente, { raison: 'enregistrement' }));
    this.vuesEtats.set(ERREUR_ENREGISTREMENT_ABANDON, creeAdaptateur(OverlayErreurEnregistrement, {
      relance: () => this.situation.modifieEtat(RELANCE_ENREGISTREMENT_ABANDON),
      abandonne: () => this.retourAccueil()
    }));
    this.vuesEtats.set(RELANCE_ENREGISTREMENT_ABANDON, creeAdaptateur(OverlayAttente, { raison: 'enregistrement' }));
    this.vuesEtats.set(RETOUR_ACCUEIL, VueTerminer);
    this.envoiEvenementDemarrageUneFoisDemarre();
    this.envoiEvenementFinSituationUneFoisTermine();
  }

  affiche(pointInsertion, $) {
    const $cadre = $('<div id="cadre" class="conteneur"></div>');
    $(pointInsertion).prepend($cadre);
    $cadre.append($('<div class="scene"></div>'));
    const selecteurCadre = '#cadre';

    const afficheEtat = (etat) => {
      if (this.vueCourante) {
        this.vueCourante.cache();
        this.vueCourante = null;
      }
      const ClasseVue = this.vuesEtats.get(etat);
      if (ClasseVue) {
        this.vueCourante = new ClasseVue(this.situation, this.depotRessources);
        this.vueCourante.affiche(selecteurCadre, $);
      }
    };

    afficheEtat(this.situation.etat());
    this.situation.on(CHANGEMENT_ETAT, afficheEtat);
    this.empecheLaFermetureDeLaSituation($);
    this.empecheLeRetourArriereDuNavigateur($);
    this.empecheLeClickDroit($);

    const vueSituation = new this.VueSituation(this.situation, this.journal, this.depotRessources, this.store);
    return this.depotRessources.chargement().then(() => {
      this.situation.modifieEtat(ATTENTE_DEMARRAGE);
      vueSituation.affiche('.scene', $);

      this.vueActions = new VueActions(this.situation, this.journal, this.depotRessources, this.store);
      this.vueActions.affiche(selecteurCadre, $);
    }).catch((err) => {
      console.error(err);
      this.situation.modifieEtat(ERREUR_CHARGEMENT);
    });
  }

  empecheLaFermetureDeLaSituation($) {
    $(window).on('beforeunload', (e) => {
      if ([ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, FINI, DEMARRE, ERREUR_ENREGISTREMENT, RELANCE_ENREGISTREMENT].includes(this.situation.etat())) {
        e.preventDefault();
        if (e.originalEvent) {
          e.originalEvent.returnValue = true;
        }
      }
    });
  }

  empecheLeRetourArriereDuNavigateur($) {
    const etatsProteges = [ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE];
    const vueStop = new VueStop(this.situation);
    const piegeHistorique = () => window.history.pushState({ piegeRetourArriere: true }, '');
    let piegeActif = false;

    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      const etaitProtege = piegeActif;
      piegeActif = etatsProteges.includes(etat);
      if (piegeActif && !etaitProtege) {
        piegeHistorique();
      }
    });

    if (etatsProteges.includes(this.situation.etat())) {
      piegeActif = true;
      piegeHistorique();
    }

    $(window).on('popstate', () => {
      if (!piegeActif) return;
      piegeHistorique();
      if ($('#fenetre-modale').length) return;
      vueStop.clickSurStop('#cadre', $);
    });
  }

  envoiEvenementFinSituationUneFoisTermine() {
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      switch (etat) {
      case FINI:
        this.journal.enregistre(new EvenementFinSituation());
        this.envoieEvenements(() => this.situation.modifieEtat(RETOUR_ACCUEIL), ERREUR_ENREGISTREMENT);
        break;
      case RELANCE_ENREGISTREMENT:
        this.envoieEvenements(() => this.situation.modifieEtat(RETOUR_ACCUEIL), ERREUR_ENREGISTREMENT, this.dureeMinimaleTestConnexion);
        break;
      case STOPPEE:
        this.journal.enregistre(new EvenementAbandon());
        this.envoieEvenements(() => this.retourAccueil(), ERREUR_ENREGISTREMENT_ABANDON);
        break;
      case RELANCE_ENREGISTREMENT_ABANDON:
        this.envoieEvenements(() => this.retourAccueil(), ERREUR_ENREGISTREMENT_ABANDON, this.dureeMinimaleTestConnexion);
        break;
      }
    });
  }

  envoieEvenements(apresEnvoi, etatEnCasDErreur, dureeMinimale = 0) {
    const attente = dureeMinimale > 0
      ? new Promise((resolve) => setTimeout(resolve, dureeMinimale))
      : Promise.resolve();
    const envoi = this.journal.envoieEvenements();
    Promise.allSettled([envoi, attente]).then(([resultat]) => {
      if (resultat.status === 'fulfilled') {
        apresEnvoi();
      } else {
        console.error(resultat.reason);
        this.situation.modifieEtat(etatEnCasDErreur);
      }
    });
  }

  empecheLeClickDroit($) {
    $('#cadre').on('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  envoiEvenementDemarrageUneFoisDemarre() {
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      switch (etat) {
      case ENTRAINEMENT_DEMARRE:
        this.journal.enregistre(new EvenementEntrainementDemarrage());
        this.journal.enregistreSituationFaite();
        break;
      case DEMARRE:
        this.journal.enregistre(new EvenementDemarrage({
          version: this.situation.version
        }));
        this.journal.enregistreSituationFaite();
        break;
      }
    });
  }
}
