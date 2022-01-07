import $ from 'jquery';

import Piece from 'commun/modeles/piece';
import DeplaceurPieces from 'commun/modeles/deplaceur_pieces';
import activeDeplacementPieces from 'commun/vues/deplacement_pieces';

describe('Le model DeplaceurPieces une fois activé', function () {
  let $pointInsertion;
  let deplaceur;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    $pointInsertion = $('#point-insertion');
    $pointInsertion.width(50).height(200);
    deplaceur = new DeplaceurPieces();
    activeDeplacementPieces(deplaceur, '#point-insertion', $);
  });

  it("peut bouger la souris même si aucune pièce n'est selectionnée", function () {
    $pointInsertion.trigger($.Event('mousemove', { buttons: 0, clientX: 30, clientY: 20 }));
  });

  it("peut bouger la souris en cliquant même si aucune pièce n'est selectionnée", function () {
    $pointInsertion.trigger($.Event('mousemove', { buttons: 1, clientX: 30, clientY: 20 }));
  });

  it("peut bouger le doigt même si aucune pièce n'est selectionnée", function () {
    $pointInsertion.trigger($.Event('touchmove',
      {
        changedTouches: [{ clientX: 30, clientY: 20 }]
      }));
  });

  describe('déplace les pièces selectionnées', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
      deplaceur.debuteSelection(piece, { clientX: 45, clientY: 110 });
    });

    it('à la souris', function () {
      $pointInsertion.trigger($.Event('mousemove', { buttons: 1, clientX: 30, clientY: 20 }));

      expect(piece.position()).toEqual({ x: 60, y: 10 });
    });

    it('avec un doigt', function () {
      $pointInsertion.trigger($.Event('touchmove',
        {
          changedTouches: [{ clientX: 30, clientY: 20 }]
        }));

      expect(piece.position()).toEqual({ x: 60, y: 10 });
    });
  });
});
