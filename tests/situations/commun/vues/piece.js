import jsdom from 'jsdom-global';

import Piece from 'commun/modeles/piece';
import VuePiece from 'commun/vues/piece';

function creeVueMinimale (piece, depot) {
  return new VuePiece(piece, depot);
}

describe('Une pièce', function () {
  let $;
  let depot;

  beforeEach(function () {
    jsdom('<div id="pointInsertion" style="width: 100px; height: 100px"></div>');
    $ = jQuery(window);
    depot = { piece () { } };
  });

  it("s'affiche", function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece, depot);
    expect($('.piece').length).to.equal(0);

    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').length).to.equal(1);
  });

  it("affiche l'image de la piece", function () {
    depot.piece = function (type) {
      expect(type).to.equal('image-type');
      return 'image-url';
    };
    const piece = new Piece({ x: 90, y: 40, type: 'image-type' });
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').attr('src')).to.eql('image-url');
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece, depot);

    $('#pointInsertion').width(200).height(50);
    vuePiece.affiche('#pointInsertion', $);

    expect($('.piece').css('left')).to.eql('180px');
    expect($('.piece').css('top')).to.eql('20px');
  });

  it('peut être bougée', function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece, depot);

    $('#pointInsertion').width(100).height(100);
    vuePiece.affiche('#pointInsertion', $);

    expect($('.piece').css('left')).to.eql('90px');
    expect($('.piece').css('top')).to.eql('40px');

    piece.changePosition({ x: 25, y: 5 });

    expect($('.piece').css('left')).to.eql('25px');
    expect($('.piece').css('top')).to.eql('5px');
  });
});
