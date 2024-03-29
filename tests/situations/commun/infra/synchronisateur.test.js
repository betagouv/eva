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

  describe('supprime les évaluations du local', function () {
    let evaluation;
    let supprimeEvaluationLocale;
    let supprimeEvenementsLocale;
    const idClient = 'id_client';
    const idClient2 = 'id_client2';

    beforeEach(function () {
      supprimeEvaluationLocale = jest.spyOn(registreUtilisateur, 'supprimeDuLocalStorage');
      supprimeEvenementsLocale = jest.spyOn(registreEvenements, 'supprimeDuLocalStorage');
    });

    describe('#supprimeEvaluationTermineDuLocal()', function () {
      describe("quand l'évaluation est terminée et que l'utilisateur n'est pas connecté", function () {
        beforeEach(function () {
          evaluation = { terminee_le: new Date() };
          window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluation));
          jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => {});
        });

        it("supprime l'évaluation du localStorage", function () {
          synchronisateur.supprimeEvaluationTermineDuLocal(idClient, evaluation);

          expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(1);
        });
      });

      describe("quand l'évaluation est terminée et que l'utilisateur est connecté", function () {
        beforeEach(function () {
          evaluation = { terminee_le: new Date() };
          window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluation));
          jest.spyOn(registreUtilisateur, 'idClient').mockImplementation(() => idClient);
        });

        it("ne supprime pas l'évaluation du localStorage", function () {
          synchronisateur.supprimeEvaluationTermineDuLocal(idClient, evaluation);

          expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(0);
        });
      });

      describe("quand l'évaluation n'est pas terminée", function () {
        beforeEach(function () {
          evaluation = { id: 1 };
          window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluation));
        });

        it('ne fais rien', function () {
          synchronisateur.supprimeEvaluationTermineDuLocal(idClient, evaluation);

          expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('#supprimeDuLocalSiObsolete()', function () {
      let evaluationObsolette;
      let evaluationValide;
      let aujourdhui;
      beforeEach(function () {
        aujourdhui = new Date('December 17, 1995 03:24:00');
        const debuteeUnMoisAvant = new Date(aujourdhui);
        debuteeUnMoisAvant.setMonth(aujourdhui.getMonth() - 1);
        debuteeUnMoisAvant.setSeconds(aujourdhui.getSeconds() - 1);

        const debuteeIlYAMoinsDUnMois = new Date(aujourdhui);
        debuteeIlYAMoinsDUnMois.setMonth(aujourdhui.getMonth() - 1);

        evaluationObsolette = { id: 1, debutee_le: debuteeUnMoisAvant };
        window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluationObsolette));
        evaluationValide = { id: 1, debutee_le: debuteeIlYAMoinsDUnMois };
        window.localStorage.setItem('evaluation_id_client2', JSON.stringify(evaluationValide));
      });

      it('supprime les évaluation et les évènements obsoletes du localStorage', function () {
        expect(synchronisateur.supprimeDuLocalSiObsolete(idClient, evaluationObsolette, aujourdhui)).toBe(true);
        expect(synchronisateur.supprimeDuLocalSiObsolete(idClient2, evaluationValide, aujourdhui)).toBe(false);

        expect(supprimeEvenementsLocale).toHaveBeenNthCalledWith(1, idClient);
        expect(supprimeEvaluationLocale).toHaveBeenNthCalledWith(1, idClient);
      });
    });
  });
});
