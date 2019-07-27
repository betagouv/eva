import Utilisateur from 'commun/modeles/utilisateur';

describe("L'utilisateur", function () {
  it('connaît sa progression', function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsFaites = () => ['tri'];

    expect(utilisateur.nombreSituationsFaites()).to.eql(1);
    expect(utilisateur.niveauActuel()).to.eql(2);
  });

  it("ne progresse pas s'il joue une situation non accessible", function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsFaites = () => ['questions'];

    expect(utilisateur.nombreSituationsFaites()).to.eql(0);
    expect(utilisateur.niveauActuel()).to.eql(1);
  });
});
