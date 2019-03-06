import jsdom from 'jsdom-global';
import { Piece } from 'controle/modeles/piece.js';
import { VuePiece, DUREE_VIE_PIECE_INFINIE } from 'controle/vues/piece.js';

function creeVueMinimale (piece) {
  return new VuePiece(piece, DUREE_VIE_PIECE_INFINIE, () => {}, () => {});
}

describe('Une pièce', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="controle" style="width: 100px; height: 100px"></div>');
    $ = jQuery(window);
  });

  it("s'affiche", function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece);
    expect($('.piece').length).to.equal(0);

    vuePiece.affiche('#controle', $);
    expect($('.piece').length).to.equal(1);
  });

  it('a une classe de conformité quand la piece est conforme', function () {
    const piece = new Piece({ x: 90, y: 40, conforme: true });
    const vuePiece = creeVueMinimale(piece);
    vuePiece.affiche('#controle', $);
    expect($('.piece').hasClass('conforme')).to.be(true);
    expect($('.piece').hasClass('defectueuse')).to.be(false);
  });

  it('a une classe de défaut quand la piece est défectueuse', function () {
    const piece = new Piece({ x: 90, y: 40, conforme: false });
    const vuePiece = creeVueMinimale(piece);
    vuePiece.affiche('#controle', $);
    expect($('.piece').hasClass('conforme')).to.be(false);
    expect($('.piece').hasClass('defectueuse')).to.be(true);
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece);

    $('#controle').width(200).height(50);
    vuePiece.affiche('#controle', $);

    expect($('.piece').css('left')).to.eql('180px');
    expect($('.piece').css('top')).to.eql('20px');
  });

  it('peut être déplacée', function () {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = creeVueMinimale(piece);
    vuePiece.affiche('#controle', $);
    expect($('.piece').css('left')).to.eql('90px');
    expect($('.piece').css('top')).to.eql('40px');

    const $piece = $('.piece');
    const $elementParent = $('#controle');
    const evenementSelectionner = $.Event('mousedown', { clientX: 95, clientY: 55 });
    const evenementGlisser = $.Event('mousemove', { clientX: 30, clientY: 20 });
    const evenementDeposer = $.Event('mouseup');
    $piece.trigger(evenementSelectionner);
    $elementParent.trigger(evenementGlisser);
    $piece.trigger(evenementDeposer);

    expect($('.piece').css('left')).to.eql('25px');
    expect($('.piece').css('top')).to.eql('5px');
  });

  it("suit une séquence d'animation pour apparaître", function (done) {
    const piece = new Piece({ x: 90, y: 40 });
    const vuePiece = new VuePiece(piece, DUREE_VIE_PIECE_INFINIE, function ($element) {
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
    const vuePiece = new VuePiece(piece, DUREE_VIE_PIECE_INFINIE, sequenceAnimation);

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

  it("disparaît au bout d'un certain temps", function (done) {
    const piece = new Piece({ x: 90, y: 40 });

    const callbackAvantSuppression = (_, callbackSuppression) => {
      callbackSuppression();
      expect($('.piece').length).to.equal(0);
      done();
    };

    const vuePiece = new VuePiece(piece, 5, () => {}, callbackAvantSuppression);
    vuePiece.affiche('#controle', $);
    expect($('.piece').length).to.equal(1);
  });
});
