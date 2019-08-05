import Progression from 'commun/modeles/progression';

describe("La progression dans l'accueil", function () {
  it("retourne le niveau 1 lorsque aucune situation n'a été débloquée", function () {
    const progression = new Progression([], ['tri']);
    expect(progression.niveau()).to.eql(1);
  });

  it('retourne le niveau 2 lorsque le tri a été débloqué', function () {
    const progression = new Progression(['tri'], ['tri']);
    expect(progression.niveau()).to.eql(2);
  });

  it('retourne le niveau en fonction du nombre de situations qui ont été débloquées', function () {
    const progression = new Progression(['tri', 'controle', 'inventaire'], ['tri', 'controle', 'inventaire']);
    expect(progression.niveau()).to.eql(4);
  });

  it('retourne le nombre de situations débloquées', function () {
    const progression = new Progression(['tri'], ['tri']);
    expect(progression.debloque()).to.eql(1);
  });

  it('ne comptabilise pas les situations débloquées qui ne sont pas accessibles', function () {
    const progression = new Progression(['tri'], ['questions']);
    expect(progression.debloque()).to.eql(0);
  });
});
