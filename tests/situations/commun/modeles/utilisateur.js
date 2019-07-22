import Utilisateur from 'commun/modeles/utilisateur.js';
import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';

describe("l'utilisateur", function () {
  let registreUtilisateur;

  beforeEach(function () {
    registreUtilisateur = {};
  });

  function unUtilisateur (situationsAccessibles = []) {
    return new Utilisateur(situationsAccessibles, registreUtilisateur);
  }

  it("inscrit l'utilisateur puis émet un événement lorsque le nom de l'utilisateur change", function (done) {
    registreUtilisateur.inscris = (nom, codeCampagne) => {
      expect(nom).to.equal('nom utilisateur');
      expect(codeCampagne).to.equal('code campagne');
      return Promise.resolve();
    };
    const utilisateur = unUtilisateur();
    utilisateur.on(CHANGEMENT_CONNEXION, done);
    utilisateur.inscris('nom utilisateur', 'code campagne');
  });

  it('retourne le nombre de situations accessibles débloquées', function () {
    registreUtilisateur.situationsFaites = () => ['tri'];
    const utilisateur = unUtilisateur(['tri', 'controle']);
    expect(utilisateur.nbSituationsDebloquees()).to.eql(2);
  });

  it('les situations non accessibles ne permettent pas de débloquer plus de situations', function () {
    registreUtilisateur.situationsFaites = () => ['questions'];
    const utilisateur = unUtilisateur(['tri']);
    expect(utilisateur.nbSituationsDebloquees()).to.eql(1);
  });

  it("déconnecte l'utilisateur quand il se déconnecte", function (done) {
    registreUtilisateur.deconnecte = done;
    unUtilisateur().deconnecte();
  });

  it("émet un événement lorsque l'utilisateur se déconnecte", function (done) {
    registreUtilisateur.deconnecte = () => {};
    const utilisateur = unUtilisateur();
    utilisateur.on(CHANGEMENT_CONNEXION, done);
    utilisateur.deconnecte();
  });

  it("estConnecte retourne true lorsque l'utilisateur est présent dans le registre", function () {
    const utilisateur = unUtilisateur();
    registreUtilisateur.identifiant = () => undefined;
    expect(utilisateur.estConnecte()).to.be(false);
    registreUtilisateur.identifiant = () => '123';
    expect(utilisateur.estConnecte()).to.be(true);
  });
});
