import jsdom from 'jsdom-global';
import Piece from 'tri/modeles/piece';
import VuePiece from 'tri/vues/piece';

describe('Une pièce', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });
  it("affiche l'image de la piece en fonction de son type", function () {
    const piece = new Piece({ image: 'url-image' });
    const vuePiece = new VuePiece(piece);
    vuePiece.affiche('#point-insertion', $);
    expect($('.piece').attr('src')).to.eql('url-image');
  });
});
