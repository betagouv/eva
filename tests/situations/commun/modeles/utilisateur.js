import Utilisateur from 'commun/modeles/utilisateur';

describe("L'utilisateur", function () {
  beforeEach(function () {
    // Note :
    // Ceci est un hack, tant que `Utilisateur` étend `RegistreUtilisateur`

    Utilisateur.prototype.enregistreSituationDebloquee = () => {};
    Utilisateur.prototype.situationsDebloquees = () => [];
  });

  it('connaît sa progression', function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsDebloquees = () => ['tri'];
    utilisateur.metsAJourProgression();

    expect(utilisateur.nombreSituationsDebloquees()).to.eql(1);
    expect(utilisateur.niveauActuel()).to.eql(2);
  });

  it("ne progresse pas s'il joue une situation non accessible", function () {
    const utilisateur = new Utilisateur(['tri']);
    utilisateur.situationsDebloquees = () => ['questions'];
    utilisateur.metsAJourProgression();

    expect(utilisateur.nombreSituationsDebloquees()).to.eql(0);
    expect(utilisateur.niveauActuel()).to.eql(1);
  });
});
