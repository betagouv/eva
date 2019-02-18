import { Situation } from 'controle/modeles/situation.js';

describe('La situation « Contrôle »', function () {
  it('connaît la cadence à laquelle arrivent les pièces', function () {
    let situation = new Situation({ cadence: 1000 });
    expect(situation.cadenceArriveePieces()).to.equal(1000);
  });
});
