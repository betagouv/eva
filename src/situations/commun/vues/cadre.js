import 'commun/styles/cadre.scss';
import {
  CHARGEMENT,
  ERREUR_CHARGEMENT,
  ATTENTE_DEMARRAGE,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI,
  RETOUR_ACCUEIL,
  CHANGEMENT_ETAT
} from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import EvenementFinSituation from 'commun/modeles/evenement_fin_situation';
import EvenementEntrainementDemarrage from 'commun/modeles/evenement_entrainement_demarrage';
import VueActions from 'commun/vues/actions';
import { creeAdaptateur } from './adaptateur_vue';
import OverlayAttente from './overlay_attente';
import OverlayErreurChargement from './overlay_erreur_chargement';
import AdaptateurConsigne from 'commun/vues/adaptateur_consigne';
import VueTerminer from 'commun/vues/terminer';

export default class VueCadre {
  constructor (VueSituation, situation, journal, depotRessources) {
    this.VueSituation = VueSituation;
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.registreUtilisateur = this.journal.registreUtilisateur;
    this.vuesEtats = new Map();
    this.vuesEtats.set(CHARGEMENT, creeAdaptateur(OverlayAttente, { raison: 'chargement' }));
    this.vuesEtats.set(ERREUR_CHARGEMENT, creeAdaptateur(OverlayErreurChargement));
    this.vuesEtats.set(ATTENTE_DEMARRAGE, AdaptateurConsigne);
    this.vuesEtats.set(ENTRAINEMENT_FINI, AdaptateurConsigne);
    this.vuesEtats.set(FINI, creeAdaptateur(OverlayAttente, { raison: 'enregistrement' }));
    this.vuesEtats.set(RETOUR_ACCUEIL, VueTerminer);
    this.envoiEvenementDemarrageUneFoisDemarre();
    this.envoiEvenementFinSituationUneFoisTermine();
  }

  affiche (pointInsertion, $) {
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

    afficheEtat (this.situation.etat());
    this.situation.on(CHANGEMENT_ETAT, afficheEtat);
    this.empecheLaFermetureDeLaSituation($);
    this.empecheLeClickDroit($);

    const vueSituation = new this.VueSituation(this.situation, this.journal, this.depotRessources, this.registreUtilisateur);
    return this.depotRessources.chargement().then(() => {
      this.situation.modifieEtat(ATTENTE_DEMARRAGE);
      vueSituation.affiche('.scene', $);

      this.vueActions = new VueActions(this.situation, this.journal, this.depotRessources, vueSituation.store);
      this.vueActions.affiche(selecteurCadre, $);
    }).catch((err) => {
      console.error(err);
      this.situation.modifieEtat(ERREUR_CHARGEMENT);
    });
  }

  empecheLaFermetureDeLaSituation ($) {
    $(window).on('beforeunload', (e) => {
      if ([ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, FINI, DEMARRE].includes(this.situation.etat())) {
        e.preventDefault();
        return '';
      }
    });
  }

  envoiEvenementFinSituationUneFoisTermine () {
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === FINI) {
        this.journal.enregistre(new EvenementFinSituation());
        this.journal.attendFinEnregistrement().finally(() => {
          this.situation.modifieEtat(RETOUR_ACCUEIL);
        });
      }
    });
  }

  empecheLeClickDroit ($) {
    $('#cadre').on('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  envoiEvenementDemarrageUneFoisDemarre () {
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
