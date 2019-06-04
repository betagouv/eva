import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import Piece from 'commun/modeles/piece';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';

describe('Le composant DeplaceurPieces', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it('déplace les pièces sélectionnées', function () {
    const piece = new Piece({ x: 95, y: 55 });
    const deplaceur = new DeplaceurPieces({
      piecesAffichees () {
        return [piece];
      }
    });
    const $pointInsertion = $('#point-insertion');

    piece.selectionne({ x: 95, y: 55 });
    $pointInsertion.width(50).height(200);
    deplaceur.activeDeplacementPieces('#point-insertion', $);

    $pointInsertion.trigger($.Event('mousemove', { buttons: 1, clientX: 30, clientY: 20 }));

    expect(piece.position()).to.eql({ x: 60, y: 10 });
  });

  it('déselectionne les pièces si il y a un mousemove sans maintien du clic', function () {
    const piece = new Piece({});
    const deplaceur = new DeplaceurPieces({
      piecesAffichees () {
        return [piece];
      }
    });
    const $pointInsertion = $('#point-insertion');

    piece.selectionne({ x: 95, y: 55 });
    deplaceur.activeDeplacementPieces('#point-insertion', $);

    $pointInsertion.trigger($.Event('mousemove', { buttons: 0, clientX: 30, clientY: 20 }));

    expect(piece.estSelectionnee()).to.be(false);
  });
});
