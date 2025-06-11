import RegistreUtilisateur,
{
  CHANGEMENT_CONNEXION,
  CLEF_SITUATIONS_FAITES
} from 'commun/infra/registre_utilisateur';
import Cookies from 'js-cookie';

describe('le registre utilisateur', function () {
  const requetes = [];

  function unRegistre (data, urlServeur, enLigne = true) {
    requetes.length = 0;
    return new RegistreUtilisateur({
      ajax (options) {
        requetes.push(options);
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
    Cookies.remove('EVA_ID');
  });

  describe('#idEvaluation()', function () {
    it("retourne l'identifiant serveur de l'évaluation courante", function () {
      const utilisateur = { id: 'identifiant' };
      const registre = new RegistreUtilisateur();
      registre.enregistreIdClient();
      registre.enregistreUtilisateurEnLocal(utilisateur);

      expect(registre.idEvaluation()).toEqual('identifiant');
    });
  });

  describe('#idClient()', function () {
    it("retourne l'identifiant client de l'évaluation courante", function () {
      const registre = new RegistreUtilisateur();
      jest.spyOn(registre, 'genereIdClient').mockImplementation(() => '502fb5e3-23bb-40af-acaa-0101e30ab767');

      registre.enregistreIdClient();
      expect(registre.idClient()).toEqual('502fb5e3-23bb-40af-acaa-0101e30ab767');
    });
  });

  describe('#enregistreIdClient()', function () {
    it("génère un identifiant client pour l'évaluation", function () {
      const registre = new RegistreUtilisateur();
      jest.spyOn(registre, 'genereIdClient').mockImplementation(() => '502fb5e3-23bb-40af-acaa-0101e30ab767');

      registre.enregistreIdClient();
      expect(Cookies.get('EVA_ID')).toEqual('502fb5e3-23bb-40af-acaa-0101e30ab767');
    });
  });

  describe('#situationsFaites()', function () {
    it("retourne un tableau vide quand il n'y a pas de situations faites", function () {
      const registre = new RegistreUtilisateur();
      expect(registre.situationsFaites()).toEqual([]);
    });
  });

  describe('#enregistreSituationFaite()', function () {
    it("ré-initialise la progression au moment de l'inscription", function () {
      const registre = unRegistre({ id: 1, nom: 'autre test' });
      registre.enregistreSituationFaite('tri');
      return registre.inscris('test').then(() => {
        expect(registre.situationsFaites()).toEqual([]);
      });
    });

    it('permet de sauvegarder et de récupérer les situations faites', function () {
      const registre = new RegistreUtilisateur();
      registre.enregistreSituationFaite('tri');
      expect(registre.situationsFaites()).toEqual(['tri']);
    });

    it('permet de sauvegarder plusieurs situations faites', function () {
      const registre = new RegistreUtilisateur();
      registre.enregistreSituationFaite('tri');
      registre.enregistreSituationFaite('controle');
      expect(registre.situationsFaites()).toEqual(['tri', 'controle']);
    });

    it('ne sauvegarde pas plusieurs fois la même situation', function () {
      const registre = new RegistreUtilisateur();
      registre.enregistreSituationFaite('tri');
      registre.enregistreSituationFaite('tri');
      expect(registre.situationsFaites()).toEqual(['tri']);
    });
  });

  describe('#creeEvaluation()', function () {
    it("permet d'inscrire et de récupérer un utilisateur", function () {
      const data = { id: 1, nom: 'mon nom' };
      const mockJQuery = {
        ajax (options) {
          expect(options.data).toEqual(JSON.stringify(data));
          options.success(data);
        }
      };
      const registre = new RegistreUtilisateur(mockJQuery, 'url quelconque');
      return registre.creeEvaluation(data).then((utilisateur) => {
        expect(utilisateur).toEqual(data);
      });
    });
  });

  describe('#metsAJourEvaluation()', function () {
    it("mets à jour les informations d'évaluation", function () {
      const data = { nom: 'mon nom' };
      const mockJQuery = {
        ajax (options) {
          expect(options.data).toEqual(JSON.stringify(data));
          options.success(data);
        }
      };
      const registre = new RegistreUtilisateur(mockJQuery, 'url quelconque');
      return registre.metsAJourEvaluation('id_evaluation', data).then((utilisateur) => {
        expect(utilisateur).toEqual(data);
      });
    });
  });

  describe('#inscris()', function () {
    it("émet un événement lorsque le nom de l'utilisateur change", function (done) {
      const registre = unRegistre({ id: 1, nom: 'test' });
      registre.on(CHANGEMENT_CONNEXION, done);
      registre.inscris('test');
    });

    describe('quand on est en ligne', function () {
      let registre;
      let mockJQuery;

      beforeEach(function () {
        mockJQuery = {
          ajax (options) {
            options.success({ id: 1, nom: 'mon nom', debutee_le: '2020-03-31T22:00:00.000Z' });
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
            expect(registre.nom()).toEqual('mon nom');
            expect(registre.idEvaluation()).toEqual(1);
            expect(utilisateur).toEqual({ id: 1, nom: 'mon nom', debutee_le: '2020-03-31T22:00:00.000Z' });
          });
        });
      });

      describe('avec le mode hors ligne activé', function () {
        beforeEach(function () {
          registre.enregistreModeHorsLigne(true);
        });

        it("permet d'inscrire et de récupérer un utilisateur", function () {
          return registre.inscris('test').then((utilisateur) => {
            expect(registre.nom()).toEqual('mon nom');
            expect(registre.idEvaluation()).toEqual(1);
            expect(utilisateur).toEqual({ id: 1, nom: 'mon nom', debutee_le: '2020-03-31T22:00:00.000Z' });
          });
        });

        it('remonte les erreurs de validation', function (done) {
          mockJQuery.ajax = (options) => {
            options.error({ status: 422 });
          };
          registre.inscris('test')
            .catch((xhr) => {
              expect(xhr.status).toEqual(422);
              done();
            });
        });
      });
    });

    describe('quand on est pas en ligne', function () {
      let registre;

      beforeEach(function () {
        jest.useFakeTimers('modern');
        registre = unRegistre({ id: 1, nom: 'autre test', debutee_le: '2020-03-31T22:00:00.000Z' }, 'https://serveur.com/', false);
      });

      afterEach(function () {
        jest.useRealTimers();
      });

      describe('avec le mode hors ligne activé', function () {
        beforeEach(function () {
          registre.enregistreModeHorsLigne(true);
        });

        it('enregistre en local un utilisateur temporaire', function () {
          return registre.inscris('Jean', 'CODE').then((utilisateur) => {
            expect(registre.nom()).toEqual('Jean');
            expect(registre.idEvaluation()).toEqual(undefined);
            expect(utilisateur.nom).toEqual('Jean');
            expect(utilisateur.code_campagne).toEqual('CODE');
            expect(utilisateur.debutee_le instanceof Date).toBe(true);
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
              expect(xhr.status).toEqual(0);
              done();
            });
        });
      });
    });
  });

  describe('#connexionParCodePersonnel()', function () {
    it('permet de connecter un utilisateur avec code_personnel', function () {
      const utilisateur = { id: 1, nom: 'Jean' };
      const registre = unRegistre(utilisateur, 'https://serveur.com/');
      jest.spyOn(registre, 'enregistreIdClient');
      jest.spyOn(registre, 'enregistreUtilisateurEnLocal');
      jest.spyOn(registre, 'emit');
  
      return registre.connexionParCodePersonnel('ABC123').then((resultat) => {
        expect(resultat).toEqual(utilisateur);
        expect(requetes.length).toEqual(1);
        expect(requetes[0].type).toBe('GET');
        expect(requetes[0].url).toBe('https://serveur.com//api/beneficiaires/ABC123');
        expect(registre.enregistreIdClient).toHaveBeenCalled();
        expect(registre.enregistreUtilisateurEnLocal).toHaveBeenCalledWith(utilisateur);
        expect(registre.emit).toHaveBeenCalledWith(CHANGEMENT_CONNEXION);
      });
    });
  
    it('remonte une erreur code_personnel_inconnu en cas de 404', function () {
      const registre = unRegistre(null, 'https://serveur.com/');
      requetes.length = 0;
      registre.$.ajax = (options) => {
        requetes.push(options);
        options.error({ status: 404 });
      };
  
      return registre.connexionParCodePersonnel('UNKNOWN').catch((erreur) => {
        expect(erreur.message).toEqual('code_personnel_inconnu');
      });
    });
  
    it('remonte une erreur erreur_reseau en cas de status 0', function () {
      const registre = unRegistre(null, 'https://serveur.com/', false);
  
      return registre.connexionParCodePersonnel('DISCONNECTED').catch((erreur) => {
        expect(erreur.message).toEqual('erreur_reseau');
      });
    });
  
    it("remonte l'objet d'erreur brut pour d'autres statuts", function () {
      const registre = unRegistre(null, 'https://serveur.com/');
      const erreurServeur = { status: 500, message: 'Erreur serveur' };
  
      registre.$.ajax = (options) => {
        options.error(erreurServeur);
      };
  
      return registre.connexionParCodePersonnel('BUG').catch((erreur) => {
        expect(erreur).toBe(erreurServeur);
      });
    });
  });

  describe('#estConnecte()', function () {
    it("retourne true lorsque l'utilisateur a rempli un nom", function () {
      const registre = unRegistre({ id: 1, nom: 'test' });
      return registre.inscris('test').then(() => {
        expect(registre.estConnecte()).toBe(true);
      });
    });

    it("retourne false lorsque l'utilisateur n'a pas rempli un nom", function () {
      const registre = new RegistreUtilisateur();
      expect(registre.estConnecte()).toBe(false);
    });
  });

  describe('#enregistreUtilisateurEnLocal()', function () {
    const registre = new RegistreUtilisateur();
    const data = { id: 1 };

    it("enregistre l'utilisateur dans le localStorage", function () {
      jest.spyOn(registre, 'genereIdClient').mockImplementation(() => 'identifiant_client');
      registre.enregistreIdClient();
      registre.enregistreUtilisateurEnLocal(data);

      expect(window.localStorage.getItem('evaluation_identifiant_client')).toBe(JSON.stringify(data));
    });
  });

  describe('#listeEvaluationsLocales', function () {
    const registre = new RegistreUtilisateur();
    it('retourne les évaluations', function () {
      window.localStorage.setItem('campagne_CODE', JSON.stringify({ id: 1 }));
      window.localStorage.setItem('evaluation_1', JSON.stringify({ id: 1 }));
      window.localStorage.setItem('campagne_CODE2', JSON.stringify({ id: 1 }));
      window.localStorage.setItem('evaluation_2', JSON.stringify({ id: 2 }));
      expect(registre.listeEvaluationsLocales()).toEqual({
        1: { id: 1 },
        2: { id: 2 }
      });
    });

    it('quand window.localStorage est null', function() {
      expect(registre.listeEvaluationsLocales(null)).toEqual({});
    });
  });

  describe('#deconnecte()', function () {
    it('à la déconnexion, nous ne sommes plus connectés', function () {
      const registre = unRegistre({ id: 1, nom: 'test' });
      return registre.inscris('test').then(() => {
        expect(registre.estConnecte()).toBe(true);
        registre.deconnecte();
        expect(registre.estConnecte()).toBe(false);
      });
    });

    it("vide les données de l'évaluation", function () {
      const registre = unRegistre(1, 'test');
      window.localStorage.setItem(CLEF_SITUATIONS_FAITES, 'liste de situations faites');
      registre.deconnecte();
      expect(window.localStorage.getItem(CLEF_SITUATIONS_FAITES)).toBe(null);
    });

    it("émet un événement lorsque l'utilisateur se déconnecte", function (done) {
      const registre = new RegistreUtilisateur();
      jest.spyOn(Cookies, 'remove');
      registre.emit = () => {
        expect(Cookies.remove).toHaveBeenCalled();
        done();
      };
      registre.on(CHANGEMENT_CONNEXION, done);
      registre.deconnecte();
    });
  });

  describe('#termineEvaluation()', function () {
    let registre;

    describe('quand on est en ligne sans erreur', function () {
      beforeEach(function () {
        registre = unRegistre({ competences_fortes: [] }, 'https://url_serveur', true);
      });

      it("fait un POST pour terminer l'évaluation à partir d'un id", function () {
        const date = new Date('2021-10-08T08:45:50.084Z');
        const data = { id: 'id_evaluation' };
        registre.enregistreUtilisateurEnLocal(data, 'identifiant_client');

        return registre.termineEvaluation('identifiant_client', date).then(() => {
          expect(requetes.length).toBe(1);
          expect(requetes[0].type).toBe('POST');
          expect(requetes[0].url).toBe('https://url_serveur/api/evaluations/id_evaluation/fin');
          expect(window.localStorage.getItem('evaluation_identifiant_client'))
            .toBe('{"id":"id_evaluation","terminee_le":"2021-10-08T08:45:50.084Z"}');
        });
      });

      it("retourne une promesse d'enregistrement", function () {
        return registre.termineEvaluation('id_client');
      });
    });

    describe('quand on est en ligne avec une erreur', function () {
      beforeEach(function () {
        registre = new RegistreUtilisateur({
          ajax (options) {
            options.error({ status: 404 });
          }
        });
      });

      it('remonte les erreurs réseau', function (done) {
        registre.termineEvaluation('id_client').catch((erreur) => {
          expect(erreur).toEqual({ status: 404 });
          done();
        });
      });
    });

    describe('quand on est pas en ligne', function () {
      beforeEach(function () {
        registre = unRegistre({}, '', false);
        registre.enregistreModeHorsLigne(true);
      });

      it("enregistre la date de fin de l'évaluation en local", function () {
        const date = new Date('2021-10-08T08:45:50.084Z');
        return registre.termineEvaluation('id_client', date).then(() => {
          expect(window.localStorage.getItem('evaluation_id_client'))
            .toBe('{"terminee_le":"2021-10-08T08:45:50.084Z"}');
        });
      });
    });
  });

  describe('#estModeHorsLigne()', function () {
    let registre;

    beforeEach(function () {
      registre = unRegistre(1, 'any');
    });

    it('est à faux par défaut', function () {
      expect(registre.estModeHorsLigne()).toBe(false);
    });

    it('enregistre un mode', function () {
      registre.enregistreModeHorsLigne(true);
      expect(registre.estModeHorsLigne()).toEqual(true);
    });
  });

  describe('#supprimeDuLocalStorage()', function () {
    let registre;

    beforeEach(function () {
      registre = unRegistre();
    });

    it("supprime l'évaluation du localStorage", function () {
      window.localStorage.setItem('evaluation_id_client', JSON.stringify({ id: 1 }));
      registre.supprimeDuLocalStorage('id_client');

      expect(window.localStorage.getItem('evaluation_id_client')).toBe(null);
    });

    it("supprime un id inexistant du localStorage ne fait pas d'erreur", function () {
      registre.supprimeDuLocalStorage('id_client');

      expect(window.localStorage.getItem('evaluation_id_client')).toBe(null);
    });
  });
});
