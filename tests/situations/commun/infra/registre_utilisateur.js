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
});
