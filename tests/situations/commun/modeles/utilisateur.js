import Utilisateur from 'commun/modeles/utilisateur';

describe("L'utilisateur", function () {
  beforeEach(function () {
    // Note :
    // Ceci est un hack, tant que `Utilisateur` étend `RegistreUtilisateur`

    Utilisateur.prototype.enregistreSituationFaite = () => {};
    Utilisateur.prototype.situationsFaites = () => [];
  });

  it('connaît sa progression', function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsFaites = () => ['tri'];
    utilisateur.metsAJourProgression();

    expect(utilisateur.nombreSituationsFaites()).to.eql(1);
    expect(utilisateur.niveauActuel()).to.eql(2);
  });

  it("ne progresse pas s'il joue une situation non accessible", function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsFaites = () => ['questions'];
    utilisateur.metsAJourProgression();

    expect(utilisateur.nombreSituationsFaites()).to.eql(0);
    expect(utilisateur.niveauActuel()).to.eql(1);
  });
});
