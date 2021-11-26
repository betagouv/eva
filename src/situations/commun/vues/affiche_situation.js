import jQuery from 'jquery';

import 'commun/styles/commun.scss';
import 'commun/styles/conteneur.scss';

import creeJournalPourSituation from 'commun/modeles/journal';
import VueCadre from 'commun/vues/cadre';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

export const SCOPE_URL = '/jeu/';

export function afficheSituation (identifiantSituation, modeleSituation, VueSituation, depotRessources) {
  function affiche (pointInsertion, $) {
    const journal = creeJournalPourSituation(identifiantSituation);

    modeleSituation.identifiant = identifiantSituation;

    if (!journal.registreUtilisateur.estConnecte()) {
      window.location.assign(SCOPE_URL);
      return;
    }

    const vueCadre = new VueCadre(VueSituation, modeleSituation, journal, depotRessources);
    vueCadre.affiche(pointInsertion, $);
  }

  initialiseInternationalisation().then(function () {
    jQuery(function () {
      document.title = traduction(`${identifiantSituation}.titre`);
      affiche('body', jQuery);
    });
  });
}
