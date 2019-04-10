import { Journal } from 'commun/modeles/journal';
import Evenement from 'commun/modeles/evenement';
import { MockDepot } from '../aides/mockDepot';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
  const registre = { consulte () {} };
  const sessionId = 42;
  const situation = 'inventaire';

  class EvenementTest extends Evenement {
    nom () {
      return 'test';
    }
  }

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, sessionId, situation, mockDepot, registre);
  });

  it('enregistre un événement', function () {
    registre.consulte = () => 'identifiant utilisateur';
    journal.enregistre(new EvenementTest());

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.only.have.keys('date', 'session_id', 'nom', 'donnees', 'situation', 'utilisateur');
    expect(enregistrement[0]).to.have.property('nom', 'test');
    expect(enregistrement[0]).to.have.property('date', 123);
    expect(enregistrement[0]).to.have.property('session_id', sessionId);
    expect(enregistrement[0]).to.have.property('situation', situation);
    expect(enregistrement[0]).to.have.property('utilisateur', 'identifiant utilisateur');
  });
});
