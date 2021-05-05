import Situation, { CHARGEMENT, DEMARRE, CHANGEMENT_ETAT, ACTIVATION_AIDE } from 'commun/modeles/situation';

describe('une situation', function () {
  it('a un état chargement par défaut', function () {
    const uneSituation = new Situation();
    expect(uneSituation.etat()).toEqual(CHARGEMENT);
  });

  it('peut changer son état', function () {
    const uneSituation = new Situation();
    uneSituation.modifieEtat(DEMARRE);
    expect(uneSituation.etat()).toEqual(DEMARRE);
  });

  it("notifie lors d'un changement d'état", function (done) {
    const uneSituation = new Situation();
    uneSituation.on(CHANGEMENT_ETAT, (etat) => {
      expect(etat).toEqual(DEMARRE);
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
    expect(compteurChangementEtat).toEqual(0);
  });

  it("retourne l'information si le mode entrainement est disponible", function () {
    const uneSituation = new Situation();
    expect(uneSituation.entrainementDisponible()).toBe(false);
  });

  it("permet d'être initialisé avec le mode entrainement disponible", function () {
    const uneSituation = new Situation({ modeEntrainement: true });
    expect(uneSituation.entrainementDisponible()).toBe(true);
  });

  it("permet d'activer l'aide", function () {
    const uneSituation = new Situation();
    expect(uneSituation.aideActivee).toBe(false);
    uneSituation.activeAide();
    expect(uneSituation.aideActivee).toBe(true);
  });

  it("notifie l'activation de l'aide", function () {
    let compteurActivationAide = 0;
    const uneSituation = new Situation();
    uneSituation.on(ACTIVATION_AIDE, () => {
      compteurActivationAide++;
    });
    uneSituation.activeAide();
    expect(compteurActivationAide).toEqual(1);
  });

  it("retourne l'information si l'aide est disponible", function () {
    const uneSituation = new Situation();
    expect(uneSituation.aideDisponible()).toBe(false);
  });

  it("permet d'être initialisé avec le mode entrainement disponible", function () {
    const uneSituation = new Situation({ modeEntrainement: false, aideDisponible: true });
    expect(uneSituation.aideDisponible()).toBe(true);
  });
});
