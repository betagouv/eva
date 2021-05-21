import RegistreUtilisateur, { CHANGEMENT_CONNEXION, CLEF_IDENTIFIANT } from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  function unRegistre (id, nom, urlServeur, enLigne = true) {
    return new RegistreUtilisateur({
      ajax (options) {
        options.success({ id, nom });
      }
    }, urlServeur, { onLine: enLigne });
  }

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('quand on est en ligne', function () {
    it("permet d'inscrire et de récupérer un utilisateur", function () {
      const registre = unRegistre(1, 'autre test', 'https://serveur.com/', true);
      return registre.inscris('test').then((utilisateur) => {
        expect(registre.nom()).to.eql('autre test');
        expect(registre.idEvaluation()).to.eql(1);
        expect(utilisateur).to.eql('{"id":1,"nom":"autre test"}');
      });
    });
  });

  describe('quand on est pas en ligne', function () {
    it('enregistre en local un utilisateur temporaire', function () {
      const registre = unRegistre(1, 'autre test', 'https://serveur.com/', false);
      return registre.inscris('Jean').then((utilisateur) => {
        expect(registre.nom()).to.eql('Jean');
        expect(registre.idEvaluation()).to.eql('temporaire_Jean');
        expect(utilisateur).to.eql('{"id":"temporaire_Jean","nom":"Jean"}');
      });
    });
  });

  it("ré-initialise la progression au moment de l'inscription", function () {
    const registre = unRegistre(1, 'autre test');
    registre.enregistreSituationFaite('tri');
    return registre.inscris('test').then(() => {
      expect(registre.situationsFaites()).to.eql([]);
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
    const registre = unRegistre(1, 'test', 'http://localhost');
    return registre.inscris('test').then(() => {
      expect(registre.urlEvaluation()).to.eql('http://localhost/api/evaluations/1.json');
    });
  });

  it("retourne l'url d'un élément d'une évaluation", function () {
    const registre = unRegistre(1, 'test', 'http://localhost');
    return registre.inscris('test').then(() => {
      expect(registre.urlEvaluation('termine'))
        .to.eql('http://localhost/api/evaluations/1/termine');
    });
  });
});
