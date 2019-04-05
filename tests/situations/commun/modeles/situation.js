import Situation, { NON_DEMARRE, LECTURE_CONSIGNE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

describe('une situation', function () {
  it('a un état non démaré par défaut', function () {
    const uneSituation = new Situation();
    expect(uneSituation.etat()).to.eql(NON_DEMARRE);
  });

  it('peut changer son état', function () {
    const uneSituation = new Situation();
    uneSituation.modifieEtat(LECTURE_CONSIGNE);
    expect(uneSituation.etat()).to.eql(LECTURE_CONSIGNE);
  });

  it("notifie lors d'un changement d'état", function (done) {
    const uneSituation = new Situation();
    uneSituation.on(CHANGEMENT_ETAT, (etat) => {
      expect(etat).to.eql(LECTURE_CONSIGNE);
      done();
    });
    uneSituation.modifieEtat(LECTURE_CONSIGNE);
  });
});
