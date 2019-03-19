import 'accueil/styles/app.scss';
import 'commun/styles/commun.scss';
import 'commun/styles/bouton.scss';
import 'commun/styles/conteneur.scss';


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
