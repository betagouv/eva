import jsdom from 'jsdom-global';
import RegistreUtilisateur, { CHANGEMENT_NOM } from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it("permet d'inscrire et de récupérer un utilisateur", function () {
    const registre = new RegistreUtilisateur();
    registre.inscris('test');
    expect(registre.consulte()).to.eql('test');
  });

  it("émet un événement lorsque le nom de l'utilisateur change", function (done) {
    const registre = new RegistreUtilisateur();
    registre.on(CHANGEMENT_NOM, done);
    registre.inscris('test');
  });

  it("estConnecte retourne true lorsque l'utilisateur a rempli un nom", function () {
    const registre = new RegistreUtilisateur();
    registre.inscris('test');
    expect(registre.estConnecte()).to.be(true);
  });

  it("estConnecte retourne false lorsque l'utilisateur n'a pas rempli un nom", function () {
    const registre = new RegistreUtilisateur();
    expect(registre.estConnecte()).to.be(false);
  });
});
