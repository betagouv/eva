import 'commun/styles/commun.scss';

import { Situation } from 'controle/modeles/situation.js';
import { VuePiece, animationInitiale } from 'controle/vues/piece.js';

function afficheSituation (pointInsertion, $) {
  let situation = new Situation({
    scenario: [true],
    positionApparitionPieces: { x: 87, y: 70 }
  });
  let piece = situation.pieceSuivante();
  let vuePiece = new VuePiece(piece, 5000);

  vuePiece.affiche(pointInsertion, $, animationInitiale);
}

jQuery(function () {
  jQuery('head').append('<title>Situation Contrôle</title>');
  jQuery('body').append('<div id="situation-controle" class="situation"></div>');

  afficheSituation('#situation-controle', jQuery);
});
