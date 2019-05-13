import jsdom from 'jsdom-global';
import Piece from 'tri/modeles/piece';
import VuePiece from 'tri/vues/piece';

describe('Une pièce', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it("sait s'afficher et se positionner", function () {
    const piece = new Piece({ image: 'url-image', posY: 200, posX: 30 });
    const vuePiece = new VuePiece(piece);
    vuePiece.affiche('#point-insertion', $);
    expect($('.piece').attr('src')).to.eql('url-image');
    expect($('.piece').css('top')).to.eql('200px');
    expect($('.piece').css('left')).to.eql('30px');
  });
});
