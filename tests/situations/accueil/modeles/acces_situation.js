import AccesSituation from 'accueil/modeles/acces_situation';

describe("l'acces à une situation", function () {
  let accesSituation;

  beforeEach(function () {
    accesSituation = new AccesSituation({ niveauMinimum: 2 });
  });

  it('est inaccessible quand le niveau actuel est inférieur à son niveau', function () {
    expect(accesSituation.estAccessible(1)).to.equal(false);
  });

  it('est accessible quand le niveau actuel est egual à son niveau', function () {
    expect(accesSituation.estAccessible(2)).to.equal(true);
  });

  it('est accessible quand le niveau actuel est superieur à son niveau', function () {
    expect(accesSituation.estAccessible(3)).to.equal(true);
  });

  it("est inaccesible si le niveau n'est pas précisé", function () {
    accesSituation = new AccesSituation({});
    expect(accesSituation.estAccessible(1)).to.equal(false);
  });
});
