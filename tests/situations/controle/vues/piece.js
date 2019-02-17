import jsdom from 'jsdom-global';
import { Piece } from 'controle/modeles/piece.js';
import { VuePiece } from 'controle/vues/piece.js';

describe('Une pièce', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="controle"></div>');
    $ = jQuery(window);
  });

  it("s'affiche", function () {
    let piece = new Piece({ x: 90, y: 40 });
    let vuePiece = new VuePiece(piece);
    expect($('.piece').length).to.equal(0);

    vuePiece.affiche('#controle', $);
    expect($('.piece').length).to.equal(1);
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    let piece = new Piece({ x: 90, y: 40 });
    let vuePiece = new VuePiece(piece);

    $('#controle').width(200).height(50);
    vuePiece.affiche('#controle', $);

    expect($('.piece').css('left')).to.eql('180px');
    expect($('.piece').css('top')).to.eql('20px');
  });
});
