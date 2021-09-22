import Synchronisateur from 'commun/infra/synchronisateur';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('Synchronisateur', function () {
  describe('#recupereReseau()', function () {
    const registreUtilisateur = new RegistreUtilisateur();

    describe("quand l'évaluation n'existe pas coté serveur", function () {
      beforeEach(function () {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));
        window.localStorage.setItem('evaluation_2', JSON.stringify({ nom: 'Clement', code_campagne: 'CODE' }));
      });

      it('enregistre une évaluation locale', function () {
        const creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation');
        new Synchronisateur(registreUtilisateur).recupereReseau();
        expect(creeEvaluation).toHaveBeenCalledTimes(2);
        expect(creeEvaluation).toHaveBeenLastCalledWith({ nom: 'Clement', code_campagne: 'CODE' });
      });
    });
  });
});
