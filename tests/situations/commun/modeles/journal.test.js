import { Journal } from 'commun/modeles/journal';
import Evenement from 'commun/modeles/evenement';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  const evenementsEnregistres = [];
  const registreUtilisateur = { idEvaluation () {} };
  const sessionId = 42;
  const identifiantSituation = 'inventaire';

  beforeEach(function () {
    evenementsEnregistres.length = 0;
    mockMaintenant = () => { return 123; };
    const registreEvenements = { enregistre: (evenement) => evenementsEnregistres.push(evenement) };
    journal = new Journal(mockMaintenant, sessionId, identifiantSituation,
      registreEvenements, registreUtilisateur);
  });

  describe('#enregistre()', function () {
    it('enregistre un événement', function () {
      registreUtilisateur.idEvaluation = () => 'identifiant evaluation';
      const donnees = { clee: 'valeur' };
      journal.enregistre(new Evenement('test', donnees));

      expect(evenementsEnregistres.length).toBe(1);
      expect(evenementsEnregistres[0]).toEqual({
        date: 123,
        donnees: donnees,
        evaluation_id: 'identifiant evaluation',
        nom: 'test',
        position: 0,
        session_id: 42,
        situation: 'inventaire'
      });
    });

    it('incrémente la position à chaque événement', function () {
      journal.enregistre(new Evenement('événement 1'));
      journal.enregistre(new Evenement('événement 2'));
      expect(evenementsEnregistres[0].position).toEqual(0);
      expect(evenementsEnregistres[1].position).toEqual(1);
    });
  });

  describe('#enregistreSituationFaite()', function () {
    it('enregistre la situation faite', function (done) {
      registreUtilisateur.enregistreSituationFaite = (nomSituation) => {
        expect(nomSituation).toEqual('nom situation');
        done();
      };
      journal.situation = 'nom situation';
      journal.enregistreSituationFaite();
    });
  });
});
