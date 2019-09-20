import jQuery from 'jquery';

import 'commun/styles/commun.scss';
import 'commun/styles/conteneur.scss';

import creeJournalPourSituation from 'commun/modeles/journal';
import VueCadre from 'commun/vues/cadre';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

const barreDev = process.env.AFFICHE_BARRE_DEV === 'true';

export function afficheSituation (identifiantSituation, modeleSituation, VueSituation, depotRessources) {
  function affiche (pointInsertion, $) {
    const journal = creeJournalPourSituation(identifiantSituation);

    modeleSituation.identifiant = identifiantSituation;
    const vueCadre = new VueCadre(VueSituation, modeleSituation, journal, depotRessources, barreDev);
    vueCadre.affiche(pointInsertion, $);
  }

  initialiseInternationalisation().then(function () {
    jQuery(function () {
      document.title = traduction(`${identifiantSituation}.titre`);
      affiche('body', jQuery);
    });
  });
}
