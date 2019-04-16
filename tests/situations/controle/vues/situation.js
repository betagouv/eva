import jsdom from 'jsdom-global';

import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import EvenementPieceBienPlacee from 'controle/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'controle/modeles/evenement_piece_mal_placee';
import EvenementPieceRatee from 'controle/modeles/evenement_piece_ratee';
import { Piece, PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { Situation, PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE, PIECE_RATEE } from 'controle/modeles/situation';
import { VueSituation } from 'controle/vues/situation';
import MockAudio from '../../commun/aides/mock_audio';

class SituationDeTest extends Situation {
  constructor (donnees) {
    super(donnees);
    this.audios.fondSonore = new MockAudio();
  }
  demarre () {}
}

function vueSituationMinimaliste (journal) {
  const situation = new SituationDeTest({ scenario: [] });
  return new VueSituation(situation, journal);
}

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it('affiche les bacs et le tapis', function () {
    const vueSituation = vueSituationMinimaliste();
    expect($('#point-insertion .bac.pieces-conformes').length).to.equal(0);
    expect($('#point-insertion .bac.pieces-defectueuses').length).to.equal(0);

    vueSituation.affiche('#point-insertion', $);

    expect($('#point-insertion').hasClass('controle')).to.be(true);
    expect($('#point-insertion .bac.pieces-conformes').length).to.equal(1);
    expect($('#point-insertion .bac.pieces-defectueuses').length).to.equal(1);
    expect($('#point-insertion .tapis').length).to.equal(1);
  });

  it('enregistre les bacs associés à la situation', function () {
    const vueSituation = vueSituationMinimaliste();
    const bacs = vueSituation.situation.bacs();

    expect(bacs.length).to.equal(2);
    expect(bacs[0].categorie()).to.equal(PIECE_CONFORME);
    expect(bacs[1].categorie()).to.equal(PIECE_DEFECTUEUSE);
  });

  it('demarre la situation', function (done) {
    const journal = { enregistre (e) {} };
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.demarre = done();

    vueSituation.affiche('#point-insertion', $);
    vueSituation.demarre('#point-insertion', $);
  });

  it("enregistre l'événement de démarrage", function (done) {
    const journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementDemarrage);
        done();
      }
    };
    const vueSituation = vueSituationMinimaliste(journal);
    vueSituation.affiche('#point-insertion', $);
    vueSituation.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  it('déplace les pièces sélectionnées', function () {
    const piece = new Piece({ x: 95, y: 55 });
    const vueSituation = vueSituationMinimaliste();
    const $pointInsertion = $('#point-insertion');

    piece.selectionne({ x: 95, y: 55 });
    $pointInsertion.width(50).height(200);
    vueSituation.affiche('#point-insertion', $);
    vueSituation.situation.ajoutePiece(piece);

    $pointInsertion.trigger($.Event('mousemove', { clientX: 30, clientY: 20 }));

    expect(piece.position()).to.eql({ x: 60, y: 10 });
  });

  describe('avec une situation démarrée, une pièce et un journal', function () {
    let journal;
    let piece;
    let vueSituation;

    beforeEach(function () {
      journal = {};
      piece = new Piece({ conforme: true });
      vueSituation = vueSituationMinimaliste(journal);

      vueSituation.affiche('#point-insertion', $);
      vueSituation.demarre('#point-insertion', $);
    });

    it('écoute les événements PIECE_BIEN_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceBienPlacee);
        expect(e.donnees()).to.eql({ piece: { conforme: true } });
        done();
      };
      vueSituation.situation.emit(PIECE_BIEN_PLACEE, piece);
    });

    it('écoute les événements PIECE_MAL_PLACEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceMalPlacee);
        expect(e.donnees()).to.eql({ piece: { conforme: true } });
        done();
      };
      vueSituation.situation.emit(PIECE_MAL_PLACEE, piece);
    });

    it('écoute les événements PIECE_RATEE pour les enregistrer dans le journal', function (done) {
      journal.enregistre = function (e) {
        expect(e).to.be.a(EvenementPieceRatee);
        expect(e.donnees()).to.eql({ piece: { conforme: true } });
        done();
      };
      vueSituation.situation.emit(PIECE_RATEE, piece);
    });
  });
});
