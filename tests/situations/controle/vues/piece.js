import jsdom from 'jsdom-global';
import { DISPARITION_PIECE } from 'controle/modeles/situation';
import Piece from 'commun/modeles/piece';
import VuePiece from 'controle/vues/piece';

describe('Une pièce', function () {
  let $;
  let depot;

  beforeEach(function () {
    jsdom('<div id="controle" style="width: 100px; height: 100px"></div>');
    $ = jQuery(window);
    depot = { piece () { } };
  });

  it("suit une séquence d'animation pour apparaître", function (done) {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = new VuePiece(piece, depot, function ($element) {
      expect($element.hasClass('.piece'));
      done();
    });

    vuePiece.affiche('#controle', $);
  });

  it("interrompt la séquence d'animation quand sélection de la pièce", function (done) {
    const piece = new Piece({ x: 90, y: 40 });
    const sequenceAnimation = function ($element) {
      $element.animate({ left: '80px' }, 0).delay(5).animate({ left: '10px' }, 0);
    };
    const vuePiece = new VuePiece(piece, depot, sequenceAnimation);

    vuePiece.affiche('#controle', $);

    const $piece = $('.piece');
    const evenementSelectionner = $.Event('mousedown', { clientX: 95, clientY: 55 });
    $piece.trigger(evenementSelectionner);

    setTimeout(() => {
      expect($piece.css('left')).to.equal('80px');
      expect(piece.position()).to.eql({ x: 80, y: 40 });
      done();
    }, 10);
  });

  it("au moment de l'événement DISPARITION_PIECE, disparait", function (done) {
    const piece = new Piece({ x: 90, y: 40 });

    const callbackAvantSuppression = (_, callbackSuppression) => {
      callbackSuppression();
      expect($('.piece').length).to.equal(0);
      done();
    };

    const vuePiece = new VuePiece(piece, depot, () => {}, callbackAvantSuppression);
    vuePiece.affiche('#controle', $);
    expect($('.piece').length).to.equal(1);
    piece.emit(DISPARITION_PIECE);
  });

  it("rajoute la classe desactiver au moment de l'événement DISPARITION_PIECE", function (done) {
    const piece = new Piece({});

    const callbackAvantSuppression = (_, callbackSuppression) => {
      callbackSuppression();
      expect($('.piece').length).to.equal(0);
      done();
    };

    const vuePiece = new VuePiece(piece, depot, () => {}, callbackAvantSuppression);
    vuePiece.affiche('#controle', $);
    expect($('.desactiver').length).to.equal(0);
    piece.emit(DISPARITION_PIECE);
    expect($('.desactiver').length).to.equal(1);
  });
});
