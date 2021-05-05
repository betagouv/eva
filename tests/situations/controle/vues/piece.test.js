import $ from 'jquery';

import DeplaceurPieces from 'commun/composants/deplaceur_pieces';
import Piece from 'commun/modeles/piece';
import VuePiece from 'controle/vues/piece';

describe('Une pièce du Contrôle', function () {
  let deplaceur;
  let depot;

  beforeEach(function () {
    $('body').append('<div id="controle" style="width: 100px; height: 100px"></div>');
    deplaceur = new DeplaceurPieces();
    deplaceur.activeDeplacementPieces('#controle', $);
    depot = { piece () { } };
  });

  it("suit une séquence d'animation pour apparaître", function (done) {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = new VuePiece(piece, depot, deplaceur, function ($element) {
      expect($element.hasClass('.piece'));
      done();
    });

    vuePiece.affiche('#controle', $);
  });

  it("interrompt la séquence d'animation quand sélection de la pièce", function (done) {
    const piece = new Piece({ x: 90, y: 40, largeur: 1, hauteur: 1 });
    const sequenceAnimation = function ($element) {
      $element.animate({ left: '80px' }, 0).delay(5).animate({ left: '10px' }, 0);
    };
    const vuePiece = new VuePiece(piece, depot, deplaceur, sequenceAnimation);

    vuePiece.affiche('#controle', $);

    const $piece = $('.piece');
    const evenementSelectionner = $.Event('mousedown', { clientX: 95, clientY: 55 });
    $piece.trigger(evenementSelectionner);

    setTimeout(() => {
      expect($piece.css('left')).toBe('80px');
      expect(piece.position()).toEqual({ x: 80, y: 40 });
      done();
    }, 10);
  });
});
