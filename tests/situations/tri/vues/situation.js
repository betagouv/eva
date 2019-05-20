import jsdom from 'jsdom-global';

import VueSituation from 'tri/vues/situation';
import Situation from 'tri/modeles/situation';
import Piece from 'tri/modeles/piece';

describe('La situation « Tri »', function () {
  let $;
  let mockDepotRessources;
  let situation;
  let journal;
  let vueSituation;
  let mockDeplaceurPieces;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    mockDepotRessources = new class {
      fondSituation () {
        return {
          src: 'image-de-fond'
        };
      }
      piece () { }
    }();
    situation = new Situation({ pieces: [] });
    vueSituation = new VueSituation(situation, journal, mockDepotRessources);
    mockDeplaceurPieces = {
      activeDeplacementPieces () {}
    };
    vueSituation.deplaceurPieces = mockDeplaceurPieces;
  });

  it('affiche le fond', function () {
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').hasClass('tri')).to.be(true);
    expect($('#point-insertion').css('background-image')).to.equal('url(image-de-fond)');
  });

  it('affiche les pièces', function () {
    situation.pieces = [new Piece({ type: 'bonbon1' })];
    vueSituation.affiche('#point-insertion', $);
    expect($('.piece', '#point-insertion').length).to.equal(1);
  });

  it('active le déplacement des pièces', function (done) {
    mockDeplaceurPieces.activeDeplacementPieces = () => {
      done();
    };
    vueSituation.affiche('#point-insertion', $);
  });
});
