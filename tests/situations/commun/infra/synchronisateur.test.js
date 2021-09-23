import Synchronisateur from 'commun/infra/synchronisateur';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('Synchronisateur', function () {
  describe('#recupereReseau()', function () {
    let registreUtilisateur;

    beforeEach(function () {
      registreUtilisateur = new RegistreUtilisateur();
      window.localStorage.clear();
    });

    describe("quand l'évaluation n'existe pas coté serveur", function () {
      it('enregistre une évaluation locale', function () {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));
        window.localStorage.setItem('evaluation_2', JSON.stringify({ nom: 'Clement', code_campagne: 'CODE' }));

        const creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation')
          .mockImplementation((data) => {
            return Promise.resolve(data);
          });
        new Synchronisateur(registreUtilisateur).recupereReseau();
        expect(creeEvaluation).toHaveBeenCalledTimes(2);
        expect(creeEvaluation).toHaveBeenLastCalledWith({ nom: 'Clement', code_campagne: 'CODE' });
      });
    });

    describe("quand l'évaluation existe coté serveur", function () {
      beforeEach(function () {
        window.localStorage.setItem('evaluation_1',
          JSON.stringify({ id: 1, email: 'Marcelle@paris.fr', telephone: '061234567' }));
      });

      it("Met à jour les informations de contact au cas où elles n'auraient pas été envoyées", function () {
        const enregistreContact = jest.spyOn(registreUtilisateur, 'enregistreContact')
          .mockImplementation((data) => {
            return Promise.resolve(data);
          });
        new Synchronisateur(registreUtilisateur).recupereReseau();
        expect(enregistreContact).toHaveBeenCalled();
        expect(enregistreContact).toHaveBeenLastCalledWith('Marcelle@paris.fr', '061234567');
      });
    });

    describe('ne peut être appelé deux fois en même temps', function () {
      let resoudLaPremierePromesse;
      let promesse;

      beforeEach(() => {
        promesse = new Promise((resolve, reject) => {
          resoudLaPremierePromesse = resolve;
        });
      });

      it('attend la fin de #creeEvaluation', function (done) {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));

        const creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation')
          .mockImplementation(() => {
            return promesse;
          });
        const synchronisateur = new Synchronisateur(registreUtilisateur);

        synchronisateur.recupereReseau();
        expect(creeEvaluation).toHaveBeenCalledTimes(1);

        setTimeout(() => {
          synchronisateur.recupereReseau();
          expect(creeEvaluation).toHaveBeenCalledTimes(1);

          resoudLaPremierePromesse({ nom: 'Marcelle', code_campagne: 'CODE' });
          setTimeout(() => {
            synchronisateur.recupereReseau();
            expect(creeEvaluation).toHaveBeenCalledTimes(2);
            done();
          });
        });
      });

      it('attend la fin de #enregistreContact', function (done) {
        window.localStorage.setItem('evaluation_1',
          JSON.stringify({ id: 1, email: 'Marcelle@paris.fr', telephone: '061234567' }));

        const spy = jest.spyOn(registreUtilisateur, 'enregistreContact')
          .mockImplementation(() => {
            return promesse;
          });
        const synchronisateur = new Synchronisateur(registreUtilisateur);

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
  });
});
