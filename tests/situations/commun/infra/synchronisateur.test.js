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
        email: 'Marcelle@paris.fr',
        telephone: '061234567',
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
          JSON.stringify({ id: 1, email: 'Marcelle@paris.fr', telephone: '061234567' }));

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
          JSON.stringify({ id: 1, email: 'Marcelle@paris.fr', telephone: '061234567' }));

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

    beforeEach(function () {
      supprimeEvaluationLocale = jest.spyOn(registreUtilisateur, 'supprimeDuLocalStorage');
      supprimeEvenementsLocale = jest.spyOn(registreEvenements, 'supprimeDuLocalStorage');
    });

    describe('#supprimeEvaluationTermineDuLocal()', function () {
      describe("quand l'évaluation est terminée", function () {
        beforeEach(function () {
          evaluation = { terminee_le: new Date() };
          window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluation));
        });

        it("supprime l'évaluation du localStorage", function () {
          synchronisateur.supprimeEvaluationTermineDuLocal(idClient, evaluation);

          expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(1);
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
      beforeEach(function () {
        const debuteeLe = new Date();
        debuteeLe.setMonth(debuteeLe.getMonth() - 1);
        debuteeLe.setSeconds(debuteeLe.getSeconds() - 1);

        evaluation = { id: 1, debutee_le: debuteeLe };
        window.localStorage.setItem('evaluation_id_client', JSON.stringify(evaluation));
      });

      it('supprime les évènements du localStorage', function () {
        synchronisateur.supprimeDuLocalSiObsolete(idClient, evaluation);

        expect(supprimeEvenementsLocale).toHaveBeenCalledTimes(1);
      });

      it("supprime l'évaluation du localStorage", function () {
        synchronisateur.supprimeDuLocalSiObsolete(idClient, evaluation);

        expect(supprimeEvaluationLocale).toHaveBeenCalledTimes(1);
      });
    });
  });
});
