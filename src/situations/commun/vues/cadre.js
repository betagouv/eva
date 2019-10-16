import 'commun/styles/cadre.scss';
import {
  CHARGEMENT,
  ERREUR_CHARGEMENT,
  ATTENTE_DEMARRAGE,
  LECTURE_CONSIGNE,
  CONSIGNE_ECOUTEE,
  ENTRAINEMENT_DEMARRE,
  ENTRAINEMENT_FINI,
  DEMARRE,
  FINI,
  CHANGEMENT_ETAT
} from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import EvenementEntrainementDemarrage from 'commun/modeles/evenement_entrainement_demarrage';
import VueActions from 'commun/vues/actions';
import VueChargement from 'commun/vues/chargement';
import VueErreurChargement from 'commun/vues/erreur_chargement';
import VueJoue from 'commun/vues/joue';
import VueConsigne from 'commun/vues/consigne';
import VueGo from 'commun/vues/go';
import VueTerminer from 'commun/vues/terminer';
import VueBarreDev from 'commun/vues/barre_dev';

export default class VueCadre {
  constructor (VueSituation, situation, journal, depotRessources, barreDev) {
    this.VueSituation = VueSituation;
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.registreUtilisateur = this.journal.registreUtilisateur;
    this.barreDev = barreDev;
    this.vuesEtats = new Map();
    this.vuesEtats.set(CHARGEMENT, VueChargement);
    this.vuesEtats.set(ERREUR_CHARGEMENT, VueErreurChargement);
    this.vuesEtats.set(ATTENTE_DEMARRAGE, VueJoue);
    this.vuesEtats.set(LECTURE_CONSIGNE, VueConsigne);
    this.vuesEtats.set(CONSIGNE_ECOUTEE, VueGo);
    this.vuesEtats.set(ENTRAINEMENT_FINI, VueGo);
    this.vuesEtats.set(FINI, VueTerminer);
    this.envoiEvenementDemarrageUneFoisDemarre();
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
      if (etat === FINI) {
        this.vueActions.cache();
      }
    };

    afficheEtat(this.situation.etat());
    this.situation.on(CHANGEMENT_ETAT, afficheEtat);
    this.previensLaFermetureDeLaSituation($);
    this.previensLeClickDroit($);
    if (this.barreDev) {
      const barreDev = new VueBarreDev(this.situation);
      barreDev.affiche(pointInsertion, $);
    }

    const vueSituation = new this.VueSituation(this.situation, this.journal, this.depotRessources, this.registreUtilisateur);
    return this.depotRessources.chargement().then(() => {
      vueSituation.affiche('.scene', $);

      this.vueActions = new VueActions(this.situation, this.journal, this.depotRessources);
      this.vueActions.affiche(selecteurCadre, $);
    });
  }

  previensLaFermetureDeLaSituation ($) {
    $(window).on('beforeunload', (e) => {
      if ([ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE].includes(this.situation.etat())) {
        e.preventDefault();
        return '';
      }
    });
  }

  previensLeClickDroit ($) {
    $('#cadre').on('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  envoiEvenementDemarrageUneFoisDemarre () {
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      switch (etat) {
        case ENTRAINEMENT_DEMARRE:
          this.journal.enregistre(new EvenementEntrainementDemarrage());
          break;
        case DEMARRE:
          this.journal.enregistre(new EvenementDemarrage());
          this.journal.enregistreSituationFaite();
          break;
      }
    });
  }
}
