import jQuery from 'jquery';

import 'accueil/styles/app.scss';

import { situations } from 'src/situations';
import VueAccueil from 'accueil/vues/accueil';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';

function afficheAccueil (pointInsertion, $) {
  const _situations = situations();
  const registreUtilisateur = new RegistreUtilisateur();
  const depotRessources = new DepotRessourcesAccueil();
  const vueAccueil = new VueAccueil(_situations, registreUtilisateur, depotRessources);
  depotRessources.chargement().then(() => {
    vueAccueil.affiche(pointInsertion, $);
  });
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('accueil.titre');
    jQuery('body').prepend('<div id="accueil" class="conteneur"></div>');
    afficheAccueil('#accueil', jQuery);
  });
});
