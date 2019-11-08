import Situation, { CHARGEMENT, DEMARRE, CHANGEMENT_ETAT, ACTIVATION_AIDE } from 'commun/modeles/situation';

describe('une situation', function () {
  it('a un état chargement par défaut', function () {
    const uneSituation = new Situation();
    expect(uneSituation.etat()).to.eql(CHARGEMENT);
  });

  it('peut changer son état', function () {
    const uneSituation = new Situation();
    uneSituation.modifieEtat(DEMARRE);
    expect(uneSituation.etat()).to.eql(DEMARRE);
  });

  it("notifie lors d'un changement d'état", function (done) {
    const uneSituation = new Situation();
    uneSituation.on(CHANGEMENT_ETAT, (etat) => {
      expect(etat).to.eql(DEMARRE);
      done();
    });
    uneSituation.modifieEtat(DEMARRE);
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
    const uneSituation = new Situation({ modeEntrainement: true });
    expect(uneSituation.entrainementDisponible()).to.be(true);
  });

  it("permet d'activer l'aide", function () {
    const uneSituation = new Situation();
    expect(uneSituation.aideActivee).to.be(false);
    uneSituation.activeAide();
    expect(uneSituation.aideActivee).to.be(true);
  });

  it("notifie l'activation de l'aide", function () {
    let compteurActivationAide = 0;
    const uneSituation = new Situation();
    uneSituation.on(ACTIVATION_AIDE, () => {
      compteurActivationAide++;
    });
    uneSituation.activeAide();
    expect(compteurActivationAide).to.eql(1);
  });

  it("retourne l'information si l'aide est disponible", function () {
    const uneSituation = new Situation();
    expect(uneSituation.aideDisponible()).to.be(false);
  });

  it("permet d'être initialisé avec le mode entrainement disponible", function () {
    const uneSituation = new Situation({ modeEntrainement: false, aideDisponible: true });
    expect(uneSituation.aideDisponible()).to.be(true);
  });
});
