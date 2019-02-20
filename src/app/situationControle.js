import 'commun/styles/commun.scss';

import { Situation } from 'controle/modeles/situation.js';
import { VueSituation } from 'controle/vues/situation.js';

function afficheSituation (pointInsertion, $) {
  let situation = new Situation({
    scenario: [true],
    positionApparitionPieces: { x: 87, y: 70 }
  });
  let vueSituation = new VueSituation(situation);
  vueSituation.affiche(pointInsertion, $);

}

jQuery(function () {
  jQuery('head').append('<title>Situation Contrôle</title>');
  jQuery('body').append('<div id="situation-controle" class="situation"></div>');

  afficheSituation('#situation-controle', jQuery);
});
