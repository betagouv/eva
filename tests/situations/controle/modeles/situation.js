import { Situation } from 'controle/modeles/situation.js';

describe('La situation « Contrôle »', function () {
  it('connaît la cadence à laquelle arrivent les pièces', function () {
    let situation = new Situation({ cadence: 1000 });
    expect(situation.cadenceArriveePieces()).to.equal(1000);
  });

  it('sait reconnaître quand plus de pieces à venir', function () {
    let situation = new Situation({ scenario: [] });
    expect(situation.sequenceTerminee()).to.be(true);
  });

  it('sait donner la piece suivante quand il y en encore à venir', function () {
    let situation = new Situation({ scenario: [false], positionApparitionPieces: { x: 25, y: 50 } });
    expect(situation.sequenceTerminee()).to.be(false);

    let piece = situation.pieceSuivante();
    expect(situation.sequenceTerminee()).to.be(true);
    expect(piece.estConforme()).to.be(false);
    expect(piece.position()).to.eql({ x: 25, y: 50 });
  });
});
