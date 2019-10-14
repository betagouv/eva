import Situation, { CHARGEMENT, LECTURE_CONSIGNE, CHANGEMENT_ETAT } from 'commun/modeles/situation';

describe('une situation', function () {
  it('a un état chargement par défaut', function () {
    const uneSituation = new Situation();
    expect(uneSituation.etat()).to.eql(CHARGEMENT);
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

  it("ne notifie pas lorsque l'état ne change pas", function () {
    let compteurChangementEtat = 0;
    const uneSituation = new Situation();
    uneSituation.modifieEtat(CHARGEMENT);
    uneSituation.on(CHANGEMENT_ETAT, (etat) => {
      compteurChangementEtat++;
    });
    uneSituation.modifieEtat(CHARGEMENT);
    expect(compteurChangementEtat).to.eql(0);
  });

  it("retourne l'information si le mode entrainement est disponible", function () {
    const uneSituation = new Situation();
    expect(uneSituation.entrainementDisponible()).to.be(false);
  });

  it("permet d'être initialisé avec le mode entrainement disponible", function () {
    const uneSituation = new Situation(true);
    expect(uneSituation.entrainementDisponible()).to.be(true);
  });
});
