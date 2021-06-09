import RegistreUtilisateur,
{
  CHANGEMENT_CONNEXION,
  CLEF_IDENTIFIANT,
  CLEF_SITUATIONS_FAITES
} from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  function unRegistre (data, urlServeur, enLigne = true) {
    return new RegistreUtilisateur({
      ajax (options) {
        if (enLigne) {
          options.success(data);
        } else {
          options.error({ status: 0 });
        }
      }
    }, urlServeur);
  }

  beforeEach(function () {
    window.localStorage.clear();
  });

  describe('quand on est en ligne', function () {
    let registre;
    let mockJQuery;

    beforeEach(function () {
      mockJQuery = {
        ajax (options) {
          options.success({ id: 1, nom: 'mon nom' });
        }
      };
      registre = new RegistreUtilisateur(mockJQuery, 'url quelconque');
    });

    describe('avec le mode hors ligne non activé', function () {
      beforeEach(function () {
        registre.enregistreModeHorsLigne(false);
      });

      it("permet d'inscrire et de récupérer un utilisateur", function () {
        return registre.inscris('test').then((utilisateur) => {
          expect(registre.nom()).to.eql('mon nom');
          expect(registre.idEvaluation()).to.eql(1);
          expect(utilisateur).to.eql({ id: 1, nom: 'mon nom' });
        });
      });
    });

    describe('avec le mode hors ligne activé', function () {
      beforeEach(function () {
        registre.enregistreModeHorsLigne(true);
      });

      it("permet d'inscrire et de récupérer un utilisateur", function () {
        return registre.inscris('test').then((utilisateur) => {
          expect(registre.nom()).to.eql('mon nom');
          expect(registre.idEvaluation()).to.eql(1);
          expect(utilisateur).to.eql({ id: 1, nom: 'mon nom' });
        });
      });

      it('remonte les erreus de validation', function (done) {
        mockJQuery.ajax = (options) => {
          options.error({ status: 422 });
        };
        registre.inscris('test')
          .catch((xhr) => {
            expect(xhr.status).to.eql(422);
            done();
          });
      });
    });
  });

  describe('quand on est pas en ligne', function () {
    let registre;

    beforeEach(function () {
      registre = unRegistre({ id: 1, nom: 'autre test' }, 'https://serveur.com/', false);
    });

    describe('avec le mode hors ligne activé', function () {
      beforeEach(function () {
        registre.enregistreModeHorsLigne(true);
      });

      it('enregistre en local un utilisateur temporaire', function () {
        return registre.inscris('Jean').then((utilisateur) => {
          expect(registre.nom()).to.eql('Jean');
          expect(registre.idEvaluation()).to.eql('temporaire_Jean');
          expect(utilisateur).to.eql({ id: 'temporaire_Jean', nom: 'Jean' });
        });
      });
    });

    describe('avec le mode hors ligne non activé', function () {
      beforeEach(function () {
        registre.enregistreModeHorsLigne(false);
      });

      it('remonte une erreur réseau', function (done) {
        registre.inscris('test')
          .catch((xhr) => {
            expect(xhr.status).to.eql(0);
            done();
          });
      });
    });
  });

  it("ré-initialise la progression au moment de l'inscription", function () {
    const registre = unRegistre({ id: 1, nom: 'autre test' });
    registre.enregistreSituationFaite('tri');
    return registre.inscris('test').then(() => {
      expect(registre.situationsFaites()).to.eql([]);
    });
  });

  it("émet un événement lorsque le nom de l'utilisateur change", function (done) {
    const registre = unRegistre({ id: 1, nom: 'test' });
    registre.on(CHANGEMENT_CONNEXION, done);
    registre.inscris('test');
  });

  it("estConnecte retourne true lorsque l'utilisateur a rempli un nom", function () {
    const registre = unRegistre({ id: 1, nom: 'test' });
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
    const registre = unRegistre({ id: 1, nom: 'test' });
    return registre.inscris('test').then(() => {
      expect(registre.estConnecte()).to.be(true);
      registre.deconnecte();
      expect(registre.estConnecte()).to.be(false);
    });
  });

  it("à la déconnexion, on vide les données de l'évaluation", function () {
    const registre = unRegistre(1, 'test');
    window.localStorage.setItem(CLEF_SITUATIONS_FAITES, 'liste de situations faites');
    registre.deconnecte();
    expect(window.localStorage.getItem(CLEF_SITUATIONS_FAITES)).to.equal(null);
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
    const registre = unRegistre({ id: 1, nom: 'test' }, 'http://localhost');
    return registre.inscris('test').then(() => {
      expect(registre.urlEvaluation()).to.eql('http://localhost/api/evaluations/1.json');
    });
  });

  it("retourne l'url d'un élément d'une évaluation", function () {
    const registre = unRegistre({ id: 1, nom: 'test' }, 'http://localhost');
    return registre.inscris('test').then(() => {
      expect(registre.urlEvaluation('termine'))
        .to.eql('http://localhost/api/evaluations/1/termine');
    });
  });

  describe('enregistreContact', function () {
    describe('quand on est en ligne', function () {
      it("met à jour les informations de l'évaluation", function () {
        const registre = unRegistre({ id: 1, nom: 'test', email: 'email@contact.fr', telephone: '0612345678' });
        return registre.enregistreContact('email@contact.fr', '0612345678').then((utilisateur) => {
          expect(utilisateur.email).to.eql('email@contact.fr');
          expect(utilisateur.telephone).to.eql('0612345678');
        });
      });
    });

    describe('quand on est pas en ligne', function () {
      let registre;

      beforeEach(function () {
        registre = unRegistre(
          { id: 1, nom: 'test', email: 'email@contact.fr', telephone: '0612345678' },
          'https://serveur.com/',
          false
        );
        registre.enregistreModeHorsLigne(true);
      });

      it("enregistre les informations de l'évaluation en local", function () {
        window.localStorage.identifiantUtilisateur = '{"id":1,"nom":"test"}';

        return registre.enregistreContact('email@contact.fr', '0612345678').then((utilisateur) => {
          expect(utilisateur.email).to.eql('email@contact.fr');
          expect(utilisateur.telephone).to.eql('0612345678');
          expect(window.localStorage.identifiantUtilisateur).to.eql('{"id":1,"nom":"test","email":"email@contact.fr","telephone":"0612345678"}');
        });
      });
    });
  });

  describe('mode hors-ligne', function () {
    let registre;

    beforeEach(function () {
      registre = unRegistre(1, 'any');
    });

    it('est à faux par défaut', function () {
      expect(registre.estModeHorsLigne()).to.equal(false);
    });

    it('enregistre un mode', function () {
      registre.enregistreModeHorsLigne(true);
      expect(registre.estModeHorsLigne()).to.eql(true);
    });
  });
});
