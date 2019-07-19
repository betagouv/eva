import jsdom from 'jsdom-global';
import RegistreUtilisateur, { CHANGEMENT_CONNEXION, CLEF_IDENTIFIANT } from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  function unRegistre (id, nom) {
    return new RegistreUtilisateur([], {
      ajax () {
        return Promise.resolve({ id, nom });
      }
    });
  }

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it("permet d'inscrire et de récupérer un utilisateur", function () {
    const registre = unRegistre(1, 'autre test');
    return registre.inscris('test').then(() => {
      expect(registre.nom()).to.eql('autre test');
      expect(registre.identifiant()).to.eql(1);
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
    const registre = new RegistreUtilisateur(['tri']);
    expect(registre.nombreSituationsFaites()).to.eql(0);
    registre.enregistreSituationFaite('tri');
    expect(registre.nombreSituationsFaites()).to.eql(1);
    expect(registre.niveauActuel()).to.eql(2);
  });

  it('les situations non accessibles ne font pas avancer la progression', function () {
    const registre = new RegistreUtilisateur(['tri']);
    expect(registre.niveauActuel()).to.eql(1);
    registre.enregistreSituationFaite('questions');
    expect(registre.nombreSituationsFaites()).to.eql(0);
    expect(registre.niveauActuel()).to.eql(1);
  });

  it('à la déconnexion, remet la progression au début', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.deconnecte();
    expect(registre.niveauActuel()).to.equal(1);
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
