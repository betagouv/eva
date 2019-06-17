import Progression from 'commun/modeles/progression';

describe("La progression dans l'accueil", function () {
  it("retourne le niveau 1 lorsque aucune situation n'a été faite", function () {
    const progression = new Progression([]);
    expect(progression.niveau()).to.eql(1);
  });

  it('retourne le niveau 2 lorsque le tri a été fait', function () {
    const progression = new Progression(['tri']);
    expect(progression.niveau()).to.eql(2);
  });

  it('retourne le niveau en fonction du nombre de situations qui ont été faites', function () {
    const progression = new Progression(['tri', 'controle', 'inventaire']);
    expect(progression.niveau()).to.eql(4);
  });
});
