import 'commun/styles/cadre.scss';
import { CHARGEMENT, ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE, LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, DEMARRE, FINI, STOPPEE, CHANGEMENT_ETAT } from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import VueActions from 'commun/vues/actions';
import VueChargement from 'commun/vues/chargement';
import VueErreurChargement from 'commun/vues/erreur_chargement';
import VueJoue from 'commun/vues/joue';
import VueConsigne from 'commun/vues/consigne';
import VueGo from 'commun/vues/go';
import VueTerminer from 'commun/vues/terminer';
import VueBarreDev from 'commun/vues/barre_dev';

export default class VueCadre {
  constructor (vueSituation, situation, journal, depotRessources, barreDev) {
    this.vueSituation = vueSituation;
    this.situation = situation;
    this.depotRessources = depotRessources;
    this.barreDev = barreDev;
    this.vueActions = new VueActions(situation, journal, this.depotRessources);
    this.vuesEtats = new Map();
    this.vuesEtats.set(CHARGEMENT, VueChargement);
    this.vuesEtats.set(ERREUR_CHARGEMENT, VueErreurChargement);
    this.vuesEtats.set(ATTENTE_DEMARRAGE, VueJoue);
    this.vuesEtats.set(LECTURE_CONSIGNE, VueConsigne);
    this.vuesEtats.set(CONSIGNE_ECOUTEE, VueGo);
    this.vuesEtats.set(FINI, VueTerminer);
    this.envoiEvenementDemarrageUneFoisDemarre(journal);
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

    return this.depotRessources.chargement().then(() => {
      this.vueSituation.affiche('.scene', $);

      this.vueActions.affiche(selecteurCadre, $);
    });
  }

  previensLaFermetureDeLaSituation ($) {
    $(window).on('beforeunload', (e) => {
      if (![CHARGEMENT, ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE, FINI, STOPPEE].includes(this.situation.etat())) {
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

  envoiEvenementDemarrageUneFoisDemarre (journal) {
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        journal.enregistre(new EvenementDemarrage());
      }
    });
  }
}
