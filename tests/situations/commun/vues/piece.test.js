import $ from 'jquery';

import activeDeplacementPieces from 'commun/vues/deplacement_pieces';
import DeplaceurPieces from 'commun/modeles/deplaceur_pieces';
import Piece, { DISPARITION_PIECE } from 'commun/modeles/piece';
import VuePiece from 'commun/vues/piece';

function activeDeplaceur (pointInsertion = '#pointInsertion') {
  const deplaceur = new DeplaceurPieces();
  activeDeplacementPieces(deplaceur, pointInsertion, $);
  return deplaceur;
}

function creeVueMinimale (piece, depot) {
  const deplaceur = activeDeplaceur();
  return new VuePiece(piece, depot, deplaceur);
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
    expect($('.piece').length).toBe(0);

    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').length).toBe(1);
  });

  it("affiche l'image de la piece", function () {
    depot.piece = function (type) {
      expect(type).toBe('image-type');
      return 'image-url';
    };
    const piece = new Piece({ x: 90, y: 40, type: 'image-type' });
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').attr('src')).toEqual('image-url');
  });

  it('met les dimensions de la pièce', function () {
    const piece = new Piece({ largeur: 10, hauteur: 20 });
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').css('width')).toEqual('10px');
    expect($('.piece').css('height')).toEqual('20px');
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece, depot);

    $('#pointInsertion').width(200).height(50);
    vuePiece.affiche('#pointInsertion', $);

    expect($('.piece').css('left')).toEqual('180px');
    expect($('.piece').css('top')).toEqual('20px');
  });

  it('peut être bougée', function () {
    const piece = new Piece({ x: 90, y: 40, largeur: 1, hauteur: 1 });
    const vuePiece = creeVueMinimale(piece, depot);

    $('#pointInsertion').width(100).height(100);
    vuePiece.affiche('#pointInsertion', $);

    expect($('.piece').css('left')).toEqual('90px');
    expect($('.piece').css('top')).toEqual('40px');

    piece.changePosition({ x: 25, y: 5 });

    expect($('.piece').css('left')).toEqual('25px');
    expect($('.piece').css('top')).toEqual('5px');
  });

  describe('peut être sélectionnée', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 90, y: 40 });
      const vuePiece = creeVueMinimale(piece, depot);
      vuePiece.affiche('#pointInsertion', $);
    });

    it('à la souris', function () {
      expect(piece.estSelectionnee()).toBe(false);
      $('.piece').trigger($.Event('mousedown', { clientX: 95, clientY: 55 }));
      expect(piece.estSelectionnee()).toBe(true);
    });

    it('au doight', function () {
      expect(piece.estSelectionnee()).toBe(false);
      $('.piece').trigger($.Event('touchstart', {
        changedTouches: [{ clientX: 95, clientY: 55 }]
      }));
      expect(piece.estSelectionnee()).toBe(true);
    });
  });

  describe('peut être désélectionnée', function () {
    let piece;

    beforeEach(function () {
      piece = new Piece({ x: 90, y: 40 });

      const deplaceur = activeDeplaceur();
      const vuePiece = new VuePiece(piece, depot, deplaceur);
      vuePiece.affiche('#pointInsertion', $);

      deplaceur.debuteSelection(piece, { clientX: 95, clientY: 55 });
    });

    it('à la souris', function () {
      expect(piece.estSelectionnee()).toBe(true);
      $('.piece').trigger($.Event('mouseup'));
      expect(piece.estSelectionnee()).toBe(false);
    });

    it('au doight', function () {
      expect(piece.estSelectionnee()).toBe(true);
      $('.piece').trigger($.Event('touchend'));
      expect(piece.estSelectionnee()).toBe(false);
    });
  });

  it("rajoute la classe selectionne lorsqu'elle est sélectionné", function () {
    const piece = new Piece({});
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece.selectionnee').length).toBe(0);
    piece.selectionne({ x: 0, y: 0 });
    expect($('.piece.selectionnee').length).toBe(1);
  });

  it("réordonne la pièce sélectionnée pour la placer en dernier dans l'élément parent", function () {
    const piece = new Piece({});
    const vuePiece = creeVueMinimale(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    $('#pointInsertion').append('<div class="element"></div>');
    expect($('.piece').index()).toBe(0);
    piece.selectionne({ x: 0, y: 0 });
    expect($('.piece').index()).toBe(1);
  });

  it("au moment de l'événement DISPARITION_PIECE, disparait", function () {
    $.fx.off = true;
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = new VuePiece(piece, depot);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.piece').length).toBe(1);
    piece.emit(DISPARITION_PIECE);
    expect($('.piece').length).toBe(0);
  });

  it("rajoute la classe desactiver au moment de l'événement DISPARITION_PIECE", function (done) {
    const piece = new Piece({});

    const callbackAvantSuppression = () => {
      expect($('.desactiver').length).toBe(1);
      done();
    };

    const deplaceur = activeDeplaceur();
    const vuePiece = new VuePiece(piece, depot, deplaceur, callbackAvantSuppression);
    vuePiece.affiche('#pointInsertion', $);
    expect($('.desactiver').length).toBe(0);
    piece.emit(DISPARITION_PIECE);
  });
});
