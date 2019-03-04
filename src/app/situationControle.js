import 'commun/styles/commun.scss';
import { Situation } from 'controle/modeles/situation.js';
import { VueSituation } from 'controle/vues/situation.js';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';

function afficheSituation (pointInsertion, $) {
  let situation = new Situation({
    scenario: [true, false, true],
    cadence: 3000,
    positionApparitionPieces: { x: 100, y: 70 },
    dureeViePiece: 12000
  });
  new ActionsCommunesSituation(pointInsertion, $, {
    enregistreStop () {}
  }).afficheElementEnCommun();
  let vueSituation = new VueSituation(situation);
  vueSituation.affiche(pointInsertion, $);
}

jQuery(function () {
  jQuery('head').append('<title>Situation Contrôle</title>');
  jQuery('body').append('<div id="situation-controle" class="situation"></div>');

  afficheSituation('#situation-controle', jQuery);
});
