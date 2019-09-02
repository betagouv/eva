import $ from 'jquery';

import Piece, { DISPARITION_PIECE } from 'commun/modeles/piece';
import VuePiece from 'commun/vues/piece';

function creeVueMinimale (piece, depot) {
  return new VuePiece(piece, depot);
}

describe('Une pièce', function () {
  let depot;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion" style="width: 100px; height: 100px"></div>');
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

  it('met les dimensions de la pièce', function () {
    const piece = new Piece({ largeur: 10, hauteur: 20 });
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').css('width')).to.eql('10px');
    expect($('.piece').css('height')).to.eql('20px');
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

  it('peut être sélectionnée', function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);

    expect(piece.estSelectionnee()).to.be(false);
    $('.piece').trigger($.Event('mousedown', { clientX: 95, clientY: 55 }));
    expect(piece.estSelectionnee()).to.be(true);
  });

  it('peut être désélectionnée', function () {
    const piece = new Piece({ x: 90, y: 40 });
    piece.selectionne({ x: 95, y: 55 });

    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);

    expect(piece.estSelectionnee()).to.be(true);
    $('.piece').trigger($.Event('mouseup'));
    expect(piece.estSelectionnee()).to.be(false);
  });

  it("rajoute la classe selectionne lorsqu'elle est sélectionné", function () {
    const piece = new Piece({});
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece.selectionnee').length).to.equal(0);
    piece.selectionne({ x: 0, y: 0 });
    expect($('.piece.selectionnee').length).to.equal(1);
  });

  it("réordonne la pièce sélectionnée pour la placer en dernier dans l'élément parent", function () {
    const piece = new Piece({});
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    $('#pointInsertion').append('<div class="element"></div>');
    expect($('.piece').index()).to.equal(0);
    piece.selectionne({ x: 0, y: 0 });
    expect($('.piece').index()).to.equal(1);
  });

  it("au moment de l'événement DISPARITION_PIECE, disparait", function () {
    $.fx.off = true;
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = new VuePiece(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').length).to.equal(1);
    piece.emit(DISPARITION_PIECE);
    expect($('.piece').length).to.equal(0);
  });

  it("rajoute la classe desactiver au moment de l'événement DISPARITION_PIECE", function (done) {
    const piece = new Piece({});

    const callbackAvantSuppression = () => {
      expect($('.desactiver').length).to.equal(1);
      done();
    };

    const vuePiece = new VuePiece(piece, depot, callbackAvantSuppression);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.desactiver').length).to.equal(0);
    piece.emit(DISPARITION_PIECE);
  });
});
