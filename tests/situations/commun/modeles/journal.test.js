import { Journal } from 'commun/modeles/journal';
import Evenement from 'commun/modeles/evenement';
import MockDepot from '../aides/mock_depot';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
  const registre = { idEvaluation () {} };
  const sessionId = 42;
  const identifiantSituation = 'inventaire';

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, sessionId, identifiantSituation, mockDepot, registre);
  });

  it('enregistre un événement', function () {
    registre.idEvaluation = () => 'identifiant evaluation';
    journal.enregistre(new Evenement('test'));

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).toBe(1);
    expect(new Set(Object.keys(enregistrement[0])))
      .toEqual(new Set([
        'nom',
        'date',
        'session_id',
        'situation',
        'evaluation_id',
        'position',
        'donnees'
      ]));
    expect(enregistrement[0]).toHaveProperty('nom', 'test');
    expect(enregistrement[0]).toHaveProperty('date', 123);
    expect(enregistrement[0]).toHaveProperty('session_id', sessionId);
    expect(enregistrement[0]).toHaveProperty('situation', identifiantSituation);
    expect(enregistrement[0]).toHaveProperty('evaluation_id', 'identifiant evaluation');
    expect(enregistrement[0]).toHaveProperty('position', 0);
  });

  it('incrémente la position à chaque événement', function () {
    journal.enregistre(new Evenement('événement 1'));
    journal.enregistre(new Evenement('événement 2'));
    const enregistrement = mockDepot.evenements();
    expect(enregistrement[0]).toHaveProperty('position', 0);
    expect(enregistrement[1]).toHaveProperty('position', 1);
  });

  it('enregistre la situation faite', function (done) {
    registre.enregistreSituationFaite = (nomSituation) => {
      expect(nomSituation).toEqual('nom situation');
      done();
    };
    journal.situation = 'nom situation';
    journal.enregistreSituationFaite();
  });
});
