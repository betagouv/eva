import jsdom from 'jsdom-global';

import VueSituation from 'tri/vues/situation';
import Bac from 'commun/modeles/bac';
import Situation from 'tri/modeles/situation';
import Piece, { PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE } from 'commun/modeles/piece';
import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';

import MockDepotRessourcesTri from '../aides/mock_depot_ressources_tri';

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
    mockDepotRessources = new MockDepotRessourcesTri();
    journal = { enregistre () {} };
    situation = new Situation({ pieces: [], bacs: [] });
    vueSituation = new VueSituation(situation, journal, mockDepotRessources);
    mockDeplaceurPieces = {
      activeDeplacementPieces () {}
    };
    vueSituation.deplaceurPieces = mockDeplaceurPieces;
  });

  it('affiche le fond', function () {
    mockDepotRessources.fondSituation = () => { return { src: 'image-de-fond' }; };
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').hasClass('tri')).to.be(true);
    expect($('#point-insertion').css('background-image')).to.equal('url(image-de-fond)');
  });

  it('affiche les pièces', function () {
    situation.piecesAffichees = () => [new Piece({ type: 'bonbon1' })];
    vueSituation.affiche('#point-insertion', $);
    expect($('.piece', '#point-insertion').length).to.equal(1);
  });

  it('affiche les bacs', function () {
    situation.bacs = () => [new Bac({}), new Bac({}), new Bac({})];
    vueSituation.affiche('#point-insertion', $);
    expect($('.bac', '#point-insertion').length).to.equal(3);
  });

  it('active le déplacement des pièces', function (done) {
    mockDeplaceurPieces.activeDeplacementPieces = () => {
      done();
    };
    vueSituation.affiche('#point-insertion', $);
  });

  describe('avec une situation démarrée, une pièce et un journal', function () {
    let piece;
    let bac;

    beforeEach(function () {
      piece = new Piece({ categorie: 'bonbon1' });
      bac = new Bac({ categorie: 'bonbon1' });
      vueSituation.affiche('#point-insertion', $);
    });

    it('écoute les événements PIECE_BIEN_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceBienPlacee);
        expect(e.donnees()).to.eql({ piece: 'bonbon1', bac: 'bonbon1' });
        done();
      };
      vueSituation.situation.emit(PIECE_BIEN_PLACEE, piece, bac);
    });

    it('écoute les événements PIECE_MAL_PLACEE pour les enregistrer dans le journal', function (done) {
      bac.categorie = () => 'bonbon2';
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceMalPlacee);
        expect(e.donnees()).to.eql({ piece: 'bonbon1', bac: 'bonbon2' });
        done();
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece, bac);
    });

    it('écoute les événements PIECE_MAL_PLACEE pour les enregistrer dans le journal sans bac', function (done) {
      bac.categorie = () => 'bonbon2';
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceMalPlacee);
        expect(e.donnees()).to.eql({ piece: 'bonbon1', bac: null });
        done();
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece, null);
    });

    it("joue le son sonBonBac lorsque'une pièce est bien placéee", function (done) {
      mockDepotRessources.sonBonBac = () => {
        return {
          start: done
        };
      };
      vueSituation.situation.emit(PIECE_BIEN_PLACEE, piece, bac);
    });

    it("joue le son sonMauvaisBac lorsque'une pièce est mal placéee", function (done) {
      mockDepotRessources.sonMauvaisBac = () => {
        return {
          start: done
        };
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece, bac);
    });
  });
});
