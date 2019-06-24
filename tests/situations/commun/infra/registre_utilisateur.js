import jsdom from 'jsdom-global';
import RegistreUtilisateur, { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

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
    registre.on(CHANGEMENT_CONNEXION, done);
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

  it('permet de récupérer les situations faites au début', function () {
    const registre = new RegistreUtilisateur();
    expect(registre.situationsFaites()).to.eql([]);
  });

  it('permet de sauvegarder et de récupérer les situations faites', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    expect(registre.situationsFaites()).to.eql(['tri']);
  });

  it('permet de sauvegarder plusieurs situations faites', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.enregistreSituationFaite('controle');
    expect(registre.situationsFaites()).to.eql(['tri', 'controle']);
  });

  it('ne sauvegarde pas plusieurs fois la même situation', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.enregistreSituationFaite('tri');
    expect(registre.situationsFaites()).to.eql(['tri']);
  });

  it('retourne la progression', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    const progression = registre.progression();
    expect(progression.niveau()).to.eql(2);
  });

  it('à la déconnexion, remet la progression au début', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.deconnecte();
    const progression = registre.progression();
    expect(progression.niveau()).to.equal(1);
  });

  it('à la déconnexion, nous ne sommes plus connectés', function () {
    const registre = new RegistreUtilisateur();
    registre.inscris('test');
    expect(registre.estConnecte()).to.be(true);
    registre.deconnecte();
    expect(registre.estConnecte()).to.be(false);
  });

  it("émet un événement lorsque l'utilisateur se déconnecte", function (done) {
    const registre = new RegistreUtilisateur();
    registre.on(CHANGEMENT_CONNEXION, done);
    registre.deconnecte();
  });
});
