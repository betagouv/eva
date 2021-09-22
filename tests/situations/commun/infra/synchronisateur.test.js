import Synchronisateur from 'commun/infra/synchronisateur';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

describe('Synchronisateur', function () {
  it("enregistre une évaluation locale qui n'a j'amais été envoyée au serveur", function () {
    window.localStorage.setItem('evaluation_1', JSON.stringify({ nom: 'Marcelle', code_campagne: 'CODE' }));
    window.localStorage.setItem('evaluation_2', JSON.stringify({ nom: 'Clement', code_campagne: 'CODE' }));
    const registreUtilisateur = new RegistreUtilisateur();
    const creeEvaluation = jest.spyOn(registreUtilisateur, 'creeEvaluation');
    new Synchronisateur(registreUtilisateur).recupereReseau();
    expect(creeEvaluation).toHaveBeenCalledTimes(2);
    expect(creeEvaluation).toHaveBeenLastCalledWith({ nom: 'Clement', code_campagne: 'CODE' });
  });
});
