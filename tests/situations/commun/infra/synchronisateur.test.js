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

    describe("quand l'évaluation existe coté serveur", function () {
      beforeEach(function () {
        window.localStorage.setItem('evaluation_1', JSON.stringify({ id: 1, email: 'Marcelle@paris.fr', telephone: '061234567' }));
      });

      it("Met à jour les informations de contact au cas où elles n'auraient pas été envoyées", function () {
        const enregistreContact = jest.spyOn(registreUtilisateur, 'enregistreContact');
        new Synchronisateur(registreUtilisateur).recupereReseau();
        expect(enregistreContact).toHaveBeenCalled();
        expect(enregistreContact).toHaveBeenLastCalledWith('Marcelle@paris.fr', '061234567');
      });
    });
  });
});
