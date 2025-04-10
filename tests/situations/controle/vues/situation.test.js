import $ from 'jquery';

import MockDepotRessourcesControle from '../aides/mock_depot_ressources_controle';
import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';
import EvenementPiecePrise from 'commun/modeles/evenement_piece_prise';
import EvenementPieceDeposeHorsBacs from 'commun/modeles/evenement_piece_depose_hors_bacs';
import EvenementPieceRatee from 'controle/modeles/evenement_piece_ratee';
import EvenementPieceApparition from 'controle/modeles/evenement_piece_apparition';
import EvenementPieceDeposeDansBac from 'controle/modeles/evenement_piece_depose_dans_bac';
import { creeStore } from 'commun/modeles/store';
jest.mock('commun/modeles/store');
import Situation, { PIECE_RATEE, NOUVELLE_PIECE } from 'controle/modeles/situation';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import Piece, {
  PIECE_BIEN_PLACEE,
  PIECE_MAL_PLACEE,
  PIECE_DEPOSE_HORS_BACS,
  PIECE_DEPOSE_DANS_BAC,
  PIECE_PRISE
} from 'commun/modeles/piece';
import VueSituation from 'controle/vues/situation';

function vueSituationMinimaliste (journal) {
  const situation = new Situation({ scenario: [], bacs: [{}, {}] });
  return new VueSituation(situation, journal, new MockDepotRessourcesControle());
}

describe('La vue de la situation « Contrôle »', function () {
  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
  });

  it("crée un store à l'initialisation", function () {
    vueSituationMinimaliste();
    expect(creeStore).toHaveBeenCalledTimes(1);
  });

  it('affiche le fond', function () {
    const vueSituation = vueSituationMinimaliste();
    vueSituation.depotRessources.fondSituation = () => { return { src: 'image-de-fond' }; };
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').css('background-image')).toBe('url(image-de-fond)');
  });

  it('affiche les bacs et le tapis', function () {
    const vueSituation = vueSituationMinimaliste();
    expect($('#point-insertion .bac').length).toBe(0);

    vueSituation.affiche('#point-insertion', $);

    expect($('#point-insertion').hasClass('controle')).toBe(true);
    expect($('#point-insertion .bac').length).toBe(2);
    expect($('#point-insertion .tapis').length).toBe(1);
  });

  it('demarre la situation', function (done) {
    const journal = { enregistre () {} };
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.demarre = (pointInsertion) => {
      expect(pointInsertion).toEqual('#point-insertion');
      done();
    };

    vueSituation.affiche('#point-insertion', $);
    vueSituation.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  describe('avec une situation démarrée, une pièce et un journal', function () {
    let journal;
    let piece;
    let vueSituation;

    beforeEach(function () {
      journal = { enregistre () {} };
      piece = new Piece({ categorie: true, type: 'def2' });
      vueSituation = vueSituationMinimaliste(journal);

      vueSituation.affiche('#point-insertion', $);
      vueSituation.demarre('#point-insertion', $);
    });

    it('écoute les événements PIECE_PRISE pour les enregistre dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPiecePrise);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_PRISE, piece);
    });

    it('écoute les événements PIECE_BIEN_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceBienPlacee);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_BIEN_PLACEE, piece);
    });

    it('écoute les événements PIECE_MAL_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceMalPlacee);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece);
    });

    it('écoute les événements PIECE_RATEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceRatee);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_RATEE, piece);
    });

    it('écoute les événements PIECE_DEPOSE_HORS_BACS pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceDeposeHorsBacs);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_DEPOSE_HORS_BACS, piece);
    });

    it('écoute les événements PIECE_DEPOSE_DANS_BAC pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceDeposeDansBac);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(PIECE_DEPOSE_DANS_BAC, piece);
    });

    it('écoute les événements NOUVELLE_PIECE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).toBeInstanceOf(EvenementPieceApparition);
        expect(e.donnees()).toEqual({ piece: { conforme: true, type: 'def2' } });
        done();
      };
      vueSituation.situation.emit(NOUVELLE_PIECE, piece);
    });
  });
});
