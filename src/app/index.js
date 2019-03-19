import 'accueil/styles/app.scss';

import { situations } from 'src/situations.js';
import { VueAccueil } from 'accueil/vues/accueil.js';

function afficheAccueil (situations, pointInsertion, $) {
  const vueAccueil = new VueAccueil(situations);
  vueAccueil.affiche(pointInsertion, $);
}

jQuery(function () {
  document.title = 'Compétences pro';
  jQuery('head').append('<title>Compétences pro</title>');
  jQuery('body').append('<div id="accueil" class="conteneur"></div>');

  afficheAccueil(situations, '#accueil', jQuery);
});
