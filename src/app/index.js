import 'accueil/styles/app.scss';

import { situations } from 'src/situations.js';
import { VueAccueil } from 'accueil/vues/accueil.js';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

function afficheAccueil (situations, pointInsertion, $) {
  const vueAccueil = new VueAccueil(situations);
  vueAccueil.affiche(pointInsertion, $);
}
initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('accueil.titre');
    jQuery('body').append('<div id="accueil" class="conteneur"></div>');
    afficheAccueil(situations(), '#accueil', jQuery);
  });
});
