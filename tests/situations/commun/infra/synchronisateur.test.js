import Synchronisateur from 'commun/infra/synchronisateur';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import RegistreEvenements from 'commun/infra/registre_evenements';

describe('Synchronisateur', function () {
  let registreUtilisateur;
  let registreEvenements;
  let synchronisateur;

  beforeEach(function () {
    registreUtilisateur = new RegistreUtilisateur();
    registreEvenements = new RegistreEvenements();

    synchronisateur = new Synchronisateur(registreUtilisateur, registreEvenements);
  });

  describe('#recupereReseau()', function () {
    let creeEvenements;
    let supprimeEvaluationLocale;

    beforeEach(function () {
      creeEvenements = jest.spyOn(registreEvenements, 'creeEvenements')
        .mockImplementation(() => {
          return Promise.resolve();
        });
      supprimeEvaluationLocale = jest.spyOn(registreUtilisateur, 'supprimeDuLocalStorage');

      window.localStorage.clear();
    });

    describe("quand l'évaluation n'existe pas coté serveur", function () {
      let creeEvaluation;
      const evaluationClement = {
        nom: 'Clement',
        code_campagne: 'CODE',
        terminee_le: '2021-10-06T16:13:24.000+02:00'
      };

      beforeEach(function () {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));
        window.localStorage.setItem('evaluation_2', JSON.stringify(evaluationClement));

        let evaluationId = 0;
        creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation')
          .mockImplementation((data) => {
            evaluationId += 1;
            return Promise.resolve({ ...data, id: 'evaluation_' + evaluationId });
          });
      });

      it('enregistre une évaluation locale', function () {
        synchronisateur.recupereReseau();

        expect(creeEvaluation).toHaveBeenCalledTimes(2);
        expect(creeEvaluation).toHaveBeenLastCalledWith(evaluationClement);
      });

      it("enregistre dans le localstorage l'évaluation créée", function (done) {
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(window.localStorage.getItem('evaluation_1')).toEqual('{"nom":"Marcelle","code_campagne":"CODE","id":"evaluation_1"}');
          done();
        });
      });

      it('synchronise les évènements pour chaque évaluation', function (done) {
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(creeEvenements).toHaveBeenCalledTimes(2);
          expect(creeEvenements).toHaveBeenNthCalledWith(1, '1', 'evaluation_1');
          expect(creeEvenements).toHaveBeenNthCalledWith(2, '2', 'evaluation_2');

          done();
        });
      });

      it("supprime l'évaluation terminée du localStorage", function (done) {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(1);

          done();
        });
      });
    });

    describe("quand l'évaluation existe coté serveur", function () {
      const evaluation = {
        id: 1,
        age: '35',
        genre: 'Femme',
        terminee_le: '2021-10-06T16:13:24.000+02:00'
      };

      beforeEach(function () {
        window.localStorage.setItem('evaluation_1',
          JSON.stringify(evaluation));
      });

      it("Met à jour les informations de l'évaluation au cas où elles n'auraient pas été envoyées", function () {
        const metsAJourEvaluation = jest.spyOn(registreUtilisateur, 'metsAJourEvaluation')
          .mockImplementation((data) => {
            return Promise.resolve(data);
          });
        synchronisateur.recupereReseau();
        expect(metsAJourEvaluation).toHaveBeenCalled();
        expect(metsAJourEvaluation).toHaveBeenLastCalledWith(1, evaluation);
      });
    });

    describe("quand l'évaluation a été supprimée coté serveur", function () {
      let echecSynchronisation;

      beforeEach(function () {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ id: 'absente', nom: 'Marcelle' }));
        window.localStorage.setItem('evenements_1', JSON.stringify([{ nom: 'demarrage' }]));
        window.localStorage.setItem('evaluation_2', JSON.stringify({ id: 'presente', nom: 'Clement' }));
        window.localStorage.setItem('evenements_2', JSON.stringify([{ nom: 'demarrage' }]));
        creeEvenements.mockRestore();

        jest.spyOn(registreUtilisateur, 'metsAJourEvaluation')
          .mockImplementation((id, data) => {
            if (id === 'absente') return Promise.reject({ status: 404 });
            return Promise.resolve(data);
          });
        jest.spyOn(registreEvenements, 'creeEvenements').mockImplementation(() => Promise.resolve());
        echecSynchronisation = jest.spyOn(synchronisateur, 'echecSynchronisation')
          .mockImplementation(() => {});
      });

      it("supprime l'évaluation et ses évènements du localStorage", function (done) {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(window.localStorage.getItem('evaluation_1')).toBeNull();
          expect(window.localStorage.getItem('evenements_1')).toBeNull();
          expect(window.localStorage.getItem('evaluation_2')).not.toBeNull();
          expect(window.localStorage.getItem('evenements_2')).not.toBeNull();
          expect(echecSynchronisation).not.toHaveBeenCalled();
          expect(registreEvenements.creeEvenements).toHaveBeenCalledTimes(1);
          expect(registreEvenements.creeEvenements).toHaveBeenCalledWith('2', 'presente');
          done();
        });
      });

      it("conserve l'évaluation en cours", function (done) {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => '1');
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(window.localStorage.getItem('evaluation_1')).not.toBeNull();
          expect(window.localStorage.getItem('evenements_1')).not.toBeNull();
          expect(echecSynchronisation).toHaveBeenCalledWith({ status: 404 });
          done();
        });
      });

      it("conserve les évaluations en cas d'autre erreur", function (done) {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});
        registreUtilisateur.metsAJourEvaluation.mockImplementation(() => Promise.reject({ status: 500 }));
        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(window.localStorage.getItem('evaluation_1')).not.toBeNull();
          expect(window.localStorage.getItem('evaluation_2')).not.toBeNull();
          expect(echecSynchronisation).toHaveBeenCalledWith({ status: 500 });
          done();
        });
      });
    });

    describe('ne peut être appelé deux fois en même temps', function () {
      let resoudLaPremierePromesse;
      let rejeteLaPremierePromesse;
      let promesse;
      let echecSynchronisation;

      beforeEach(() => {
        promesse = new Promise((resolve, reject) => {
          resoudLaPremierePromesse = resolve;
          rejeteLaPremierePromesse = reject;
        });
        echecSynchronisation = jest.spyOn(synchronisateur, 'echecSynchronisation')
          .mockImplementation(() => {});
      });

      it('attend la fin de #creeEvaluation', function (done) {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));

        const creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation')
          .mockImplementation(() => {
            return promesse;
          });

        synchronisateur.recupereReseau();
        expect(creeEvaluation).toHaveBeenCalledTimes(1);

        setTimeout(() => {
          synchronisateur.recupereReseau();
          expect(creeEvaluation).toHaveBeenCalledTimes(1);

          rejeteLaPremierePromesse('une erreur');
          setTimeout(() => {
            expect(echecSynchronisation).toHaveBeenCalledWith('une erreur');
            synchronisateur.recupereReseau();
            expect(creeEvaluation).toHaveBeenCalledTimes(2);
            done();
          });
        });
      });

      it('attend la fin de #metsAJourEvaluation', function (done) {
        window.localStorage.setItem('evaluation_1',
          JSON.stringify({ id: 1, age: '32', genre: 'Femme' }));

        const spy = jest.spyOn(registreUtilisateur, 'metsAJourEvaluation')
          .mockImplementation(() => {
            return promesse;
          });

        synchronisateur.recupereReseau();
        expect(spy).toHaveBeenCalledTimes(1);

        setTimeout(() => {
          synchronisateur.recupereReseau();
          expect(spy).toHaveBeenCalledTimes(1);

          resoudLaPremierePromesse({ id: 1 });
          setTimeout(() => {
            synchronisateur.recupereReseau();
            expect(spy).toHaveBeenCalledTimes(2);
            done();
          });
        });
      });
    });

    describe('récupère les erreurs', function () {
      const spy = {};

      beforeEach(() => {
        spy.error = jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        spy.error.mockRestore();
      });

      it("lors de l'enregistrement des evenements", function (done) {
        const erreur = new Error('erreur enregistrement evenement');
        window.localStorage.setItem('evaluation_1',
          JSON.stringify({ id: 1, age: '32', genre: 'Homme' }));

        jest.spyOn(registreUtilisateur, 'metsAJourEvaluation')
          .mockImplementation(() => {
            return Promise.resolve({ id: '1' });
          });

        jest.spyOn(registreEvenements, 'creeEvenements')
          .mockImplementation(() => {
            return Promise.reject(erreur);
          });

        synchronisateur.recupereReseau();

        setTimeout(() => {
          expect(spy.error).toHaveBeenCalledWith(erreur);
          done();
        });
      });
    });
  });

  describe('#supprimeDuLocalStorageSi()', function () {
    const idClient = 'id_client';

    beforeEach(function () {
      window.localStorage.clear();
      window.localStorage.setItem('evaluation_id_client', JSON.stringify({ id: 1 }));
      window.localStorage.setItem('evenements_id_client', JSON.stringify([{ nom: 'demarrage' }]));
    });

    it("supprime l'évaluation et ses évènements quand la condition est vraie", function () {
      expect(synchronisateur.supprimeDuLocalStorageSi(idClient, true)).toBe(true);

      expect(window.localStorage.getItem('evaluation_id_client')).toBeNull();
      expect(window.localStorage.getItem('evenements_id_client')).toBeNull();
    });

    it('ne supprime rien quand la condition est fausse', function () {
      expect(synchronisateur.supprimeDuLocalStorageSi(idClient, false)).toBe(false);

      expect(window.localStorage.getItem('evaluation_id_client')).not.toBeNull();
      expect(window.localStorage.getItem('evenements_id_client')).not.toBeNull();
    });
  });

  describe('conditions de suppression du local', function () {
    const idClient = 'id_client';

    describe('#estTerminee()', function () {
      it("est vrai quand l'évaluation est terminée et n'est pas en cours", function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});

        expect(synchronisateur.estTerminee(idClient, { terminee_le: new Date() })).toBe(true);
      });

      it("est faux quand l'évaluation terminée est en cours", function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => idClient);

        expect(synchronisateur.estTerminee(idClient, { terminee_le: new Date() })).toBe(false);
      });

      it("est faux quand l'évaluation n'est pas terminée", function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});

        expect(synchronisateur.estTerminee(idClient, { id: 1 })).toBe(false);
      });
    });

    describe('#estAbsenteDuServeur()', function () {
      it("est vrai quand le serveur répond 404 et que l'évaluation n'est pas en cours", function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});

        expect(synchronisateur.estAbsenteDuServeur(idClient, { status: 404 })).toBe(true);
      });

      it("est faux quand l'évaluation est en cours", function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => idClient);

        expect(synchronisateur.estAbsenteDuServeur(idClient, { status: 404 })).toBe(false);
      });

      it('est faux pour une autre erreur', function () {
        jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});

        expect(synchronisateur.estAbsenteDuServeur(idClient, { status: 500 })).toBe(false);
      });
    });

    describe('#estObsolete()', function () {
      const aujourdhui = new Date('December 17, 1995 03:24:00');

      it("est vrai quand l'évaluation a débuté il y a plus d'un mois", function () {
        const debuteeIlYAPlusDUnMois = new Date(aujourdhui);
        debuteeIlYAPlusDUnMois.setMonth(aujourdhui.getMonth() - 1);
        debuteeIlYAPlusDUnMois.setSeconds(aujourdhui.getSeconds() - 1);

        expect(synchronisateur.estObsolete({ debutee_le: debuteeIlYAPlusDUnMois }, aujourdhui)).toBe(true);
      });

      it("est faux quand l'évaluation a débuté il y a un mois ou moins", function () {
        const debuteeIlYAUnMois = new Date(aujourdhui);
        debuteeIlYAUnMois.setMonth(aujourdhui.getMonth() - 1);

        expect(synchronisateur.estObsolete({ debutee_le: debuteeIlYAUnMois }, aujourdhui)).toBe(false);
      });
    });
  });
});
