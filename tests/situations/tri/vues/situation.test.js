import $ from 'jquery';

import VueSituation from 'tri/vues/situation';
import Bac from 'commun/modeles/bac';
import Situation from 'tri/modeles/situation';
import Piece, { PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE, PIECE_DEPOSE_HORS_BACS, PIECE_PRISE } from 'commun/modeles/piece';
import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';
import EvenementPiecePrise from 'commun/modeles/evenement_piece_prise';
import EvenementPieceDeposeHorsBacs from 'commun/modeles/evenement_piece_depose_hors_bacs';

import MockDepotRessourcesTri from '../aides/mock_depot_ressources_tri';

describe('La situation « Tri »', function () {
  let mockDepotRessources;
  let situation;
  let journal;
  let vueSituation;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    mockDepotRessources = new MockDepotRessourcesTri();
    journal = { enregistre () {} };
    situation = new Situation({ pieces: [], bacs: [] });
    vueSituation = new VueSituation(situation, journal, mockDepotRessources);
  });

  it('affiche le fond', function () {
    mockDepotRessources.fondSituation = () => { return { src: 'image-de-fond' }; };
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').hasClass('tri')).toBe(true);
    expect($('#point-insertion').css('background-image')).toBe('url(image-de-fond)');
  });

  it('affiche les pièces', function () {
    situation.piecesAffichees = () => [new Piece({ type: 'bonbon1' })];
    vueSituation.affiche('#point-insertion', $);
    expect($('.piece', '#point-insertion').length).toBe(1);
  });

  it('affiche les bacs', function () {
    situation.bacs = () => [new Bac({}), new Bac({}), new Bac({})];
    vueSituation.affiche('#point-insertion', $);
    expect($('.bac', '#point-insertion').length).toBe(3);
  });

  it('active le déplacement des pièces', function (done) {
    vueSituation.deplaceurPieces.deplaceSouris = () => {
      done();
    };

    vueSituation.affiche('#point-insertion', $);
    $('#point-insertion').trigger('mousemove');
  });

  describe('avec une situation démarrée, une pièce et un journal', function () {
    let piece;
    let bac;

    beforeEach(function () {
      piece = new Piece({ categorie: 'bonbon1' });
      bac = new Bac({ categorie: 'bonbon1' });
      vueSituation.affiche('#point-insertion', $);
    });

    it('écoute les événements PIECE_PRISE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPiecePrise);
        expect(e.donnees()).toEqual({ piece: 'bonbon1' });
        done();
      };
      vueSituation.situation.emit(PIECE_PRISE, piece);
    });

    it('écoute les événements PIECE_BIEN_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceBienPlacee);
        expect(e.donnees()).toEqual({ piece: 'bonbon1', bac: 'bonbon1' });
        done();
      };
      vueSituation.situation.emit(PIECE_BIEN_PLACEE, piece, bac);
    });

    it('écoute les événements PIECE_MAL_PLACEE pour les enregistrer dans le journal', function (done) {
      bac.categorie = () => 'bonbon2';
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceMalPlacee);
        expect(e.donnees()).toEqual({ piece: 'bonbon1', bac: 'bonbon2' });
        done();
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece, bac);
    });

    it('écoute les événements PIECE_DEPOSE_HORS_BACS pour les enregistrer dans le journal', function (done) {
      bac.categorie = () => 'bonbon2';
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceDeposeHorsBacs);
        expect(e.donnees()).toEqual({ piece: 'bonbon1' });
        done();
      };
      vueSituation.situation.emit(PIECE_DEPOSE_HORS_BACS, piece);
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
