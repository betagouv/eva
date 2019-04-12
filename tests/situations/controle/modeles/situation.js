import { FINI } from 'commun/modeles/situation';
import { Situation, NOUVELLE_PIECE, DISPARITION_PIECE } from 'controle/modeles/situation';
import { Bac } from 'controle/modeles/bac';
import { Piece } from 'controle/modeles/piece';

function creeSituationMinimale () {
  return new Situation({
    cadence: 0,
    scenario: [{ conforme: false }],
    positionApparitionPieces: { x: 25, y: 50 },
    dureeViePiece: 1
  });
}

describe('La situation « Contrôle »', function () {
  it('connaît la cadence à laquelle arrivent les pièces', function () {
    let situation = new Situation({ cadence: 1000 });
    expect(situation.cadenceArriveePieces()).to.equal(1000);
  });

  it("connaît la durée de vie d'une pièce", function () {
    let situation = new Situation({ dureeViePiece: 42 });
    expect(situation.dureeViePiece()).to.equal(42);
  });

  it('sait reconnaître quand plus de pieces à venir', function () {
    let situation = new Situation({ scenario: [] });
    expect(situation.sequenceTerminee()).to.be(true);
  });

  it('sait donner la piece suivante quand il y en encore à venir', function () {
    let situation = new Situation({ scenario: [{ conforme: false }], positionApparitionPieces: { x: 25, y: 50 } });
    expect(situation.sequenceTerminee()).to.be(false);

    let piece = situation.pieceSuivante();
    expect(situation.sequenceTerminee()).to.be(true);
    expect(piece.estConforme()).to.be(false);
    expect(piece.position()).to.eql({ x: 25, y: 50 });
  });

  it('démarre la situation et ajoute la piece dans les pieces en cours', function () {
    const situation = creeSituationMinimale();
    expect(situation.piecesAffichees().length).to.eql(0);
    situation.demarre();
    expect(situation.piecesAffichees().length).to.eql(1);
  });

  it("démarre la situation et déclenche un événement a l'ajout de la piece dans les pieces en cours", function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, () => {
      done();
    });
    situation.demarre();
  });

  it('enleve la piece des pieces en cours apres le temps défini', function (done) {
    const situation = creeSituationMinimale();
    situation.on(NOUVELLE_PIECE, (piece) => {
      piece.on(DISPARITION_PIECE, () => {
        expect(situation.piecesAffichees().length).to.eql(0);
        done();
      });
    });
    situation.demarre();
  });

  it('passe la situation en fini une fois que toutes les pieces ont disparu', function () {
    const piece1 = new Piece({});
    const piece2 = new Piece({});
    const situation = new Situation({ scenario: [] });

    situation.ajoutePiece(piece1);
    situation.ajoutePiece(piece2);
    situation.faisDisparaitrePiece(piece1);
    expect(situation.etat()).to.not.eql(FINI);
    situation.faisDisparaitrePiece(piece2);
    expect(situation.etat()).to.eql(FINI);
  });

  it('on peut lui ajouter des bacs', function () {
    const situation = new Situation({ scenario: [] });
    situation.ajouteBac(new Bac({}));
    expect(situation.bacs().length).to.eql(1);
  });
});
