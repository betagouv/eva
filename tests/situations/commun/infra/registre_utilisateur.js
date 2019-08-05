import RegistreUtilisateur, { CHANGEMENT_CONNEXION, CLEF_IDENTIFIANT } from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  function unRegistre (id, nom) {
    return new RegistreUtilisateur({
      ajax () {
        return Promise.resolve({ id, nom });
      }
    });
  }

  beforeEach(function () {
    window.localStorage.clear();
  });

  it("permet d'inscrire et de récupérer un utilisateur", function () {
    const registre = unRegistre(1, 'autre test');
    return registre.inscris('test').then(() => {
      expect(registre.nom()).to.eql('autre test');
      expect(registre.idEvaluation()).to.eql(1);
    });
  });

  it("émet un événement lorsque le nom de l'utilisateur change", function (done) {
    const registre = unRegistre(1, 'test');
    registre.on(CHANGEMENT_CONNEXION, done);
    registre.inscris('test');
  });

  it("estConnecte retourne true lorsque l'utilisateur a rempli un nom", function () {
    const registre = unRegistre(1, 'test');
    return registre.inscris('test').then(() => {
      expect(registre.estConnecte()).to.be(true);
    });
  });

  it("estConnecte retourne false lorsque l'utilisateur n'a pas rempli un nom", function () {
    const registre = new RegistreUtilisateur();
    expect(registre.estConnecte()).to.be(false);
  });

  it('permet de récupérer les situations débloquées au début', function () {
    const registre = new RegistreUtilisateur();
    expect(registre.situationsDebloquees()).to.eql([]);
  });

  it('permet de sauvegarder et de récupérer les situations débloquées', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationDebloquee('tri');
    expect(registre.situationsDebloquees()).to.eql(['tri']);
  });

  it('permet de sauvegarder plusieurs situations débloquées', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationDebloquee('tri');
    registre.enregistreSituationDebloquee('controle');
    expect(registre.situationsDebloquees()).to.eql(['tri', 'controle']);
  });

  it('ne sauvegarde pas plusieurs fois la même situation', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationDebloquee('tri');
    registre.enregistreSituationDebloquee('tri');
    expect(registre.situationsDebloquees()).to.eql(['tri']);
  });

  it('à la déconnexion, remet la progression au début', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationDebloquee('tri');
    registre.deconnecte();
    expect(registre.situationsDebloquees()).to.eql([]);
  });

  it('à la déconnexion, nous ne sommes plus connectés', function () {
    const registre = unRegistre(1, 'test');
    return registre.inscris('test').then(() => {
      expect(registre.estConnecte()).to.be(true);
      registre.deconnecte();
      expect(registre.estConnecte()).to.be(false);
    });
  });

  it("émet un événement lorsque l'utilisateur se déconnecte", function (done) {
    const registre = new RegistreUtilisateur();
    registre.on(CHANGEMENT_CONNEXION, done);
    registre.deconnecte();
  });

  it('déconnecte si ancienne données présentes', function () {
    window.localStorage.setItem(CLEF_IDENTIFIANT, 'nom utilisateur');
    const registre = new RegistreUtilisateur();
    expect(registre.estConnecte()).to.be(false);
  });

  it("retourne l'url de l'évaluation", function () {
    process.env.URL_SERVEUR = 'http://localhost';
    const registre = unRegistre(1, 'test');
    return registre.inscris('test').then(() => {
      expect(registre.urlEvaluation()).to.eql('http://localhost/api/evaluations/1.json');
    });
  });
});
