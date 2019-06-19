import jQuery from 'jquery';

import 'commun/infra/report_erreurs';
import DepotRessourcesCompteRendu from 'compte_rendu/infra/depot_ressources_compte_rendu';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import VueSituation from 'compte_rendu/vues/situation';

import 'commun/styles/situation.scss';

function afficheSituation (pointInsertion, $) {
  const depotRessources = new DepotRessourcesCompteRendu();
  const vueSituation = new VueSituation(depotRessources);
  depotRessources.chargement().then(() => {
    vueSituation.affiche(pointInsertion, $);
  });
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('compte_rendu.titre');
    jQuery('body').prepend('<div id="compte_rendu" class="conteneur"></div>');
    afficheSituation('#compte_rendu', jQuery);
  });
});
