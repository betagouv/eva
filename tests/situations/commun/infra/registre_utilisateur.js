import jsdom from 'jsdom-global';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it("permet d'inscrire et de récupérer un utilisateur", function () {
    const registre = new RegistreUtilisateur();
    registre.inscris('test');
    expect(registre.consulte()).to.eql('test');
  });
});
