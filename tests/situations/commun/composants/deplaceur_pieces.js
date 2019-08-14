import $ from 'jquery';

import Piece from 'commun/modeles/piece';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';

describe('Le composant DeplaceurPieces', function () {
  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
  });

  it('déplace les pièces sélectionnées', function () {
    const piece = new Piece({ x: 90, y: 55 });
    const deplaceur = new DeplaceurPieces();
    const $pointInsertion = $('#point-insertion');
    $pointInsertion.width(50).height(200);

    deplaceur.activeDeplacementPieces('#point-insertion', $);
    deplaceur.debuteSelection(piece, { x: 90, y: 55 }, { clientX: 45, clientY: 110 });

    $pointInsertion.trigger($.Event('mousemove', { buttons: 1, clientX: 30, clientY: 20 }));

    expect(piece.position()).to.eql({ x: 60, y: 10 });
  });

  it('déselectionne les pièces si il y a un mousemove sans maintien du clic', function () {
    const piece = new Piece({});
    const deplaceur = new DeplaceurPieces();
    const $pointInsertion = $('#point-insertion');

    deplaceur.activeDeplacementPieces('#point-insertion', $);
    deplaceur.debuteSelection(piece, {}, { clientX: 95, clientY: 55 });
    expect(piece.estSelectionnee()).to.be(true);

    $pointInsertion.trigger($.Event('mousemove', { buttons: 0, clientX: 30, clientY: 20 }));

    expect(piece.estSelectionnee()).to.be(false);
  });
});
