import $ from 'jquery';

import Piece from 'commun/modeles/piece';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';

describe('Le composant DeplaceurPieces', function () {
  let $pointInsertion;
  let deplaceur;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    $pointInsertion = $('#point-insertion');
    deplaceur = new DeplaceurPieces();
    deplaceur.activeDeplacementPieces('#point-insertion', $);
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
      $pointInsertion.width(50).height(200);
      piece = new Piece({ x: 90, y: 55, largeur: 10, hauteur: 10 });
      deplaceur.debuteSelection(piece, { x: 90, y: 55 }, { clientX: 45, clientY: 110 });
    });

    it('à la souris', function () {
      $pointInsertion.trigger($.Event('mousemove', { buttons: 1, clientX: 30, clientY: 20 }));

      expect(piece.position()).to.eql({ x: 60, y: 10 });
    });

    it('avec un doigt', function () {
      $pointInsertion.trigger($.Event('touchmove',
        {
          changedTouches: [{ clientX: 30, clientY: 20 }]
        }));

      expect(piece.position()).to.eql({ x: 60, y: 10 });
    });
  });

  it('déselectionne les pièces si il y a un mousemove sans maintien du clic', function () {
    const piece = new Piece({});

    deplaceur.debuteSelection(piece, {}, {});
    expect(piece.estSelectionnee()).to.be(true);

    $pointInsertion.trigger($.Event('mousemove', { buttons: 0 }));

    expect(piece.estSelectionnee()).to.be(false);
  });
});
