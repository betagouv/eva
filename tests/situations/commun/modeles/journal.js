import { Journal } from 'commun/modeles/journal';
import Evenement from 'commun/modeles/evenement';
import { MockDepot } from '../aides/mockDepot';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
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
    journal = new Journal(mockMaintenant, sessionId, situation, mockDepot);
  });

  it('enregistre un événement', function () {
    journal.enregistre(new EvenementTest());

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.only.have.keys('date', 'sessionId', 'nom', 'donnees', 'situation');
    expect(enregistrement[0]).to.have.property('nom', 'test');
    expect(enregistrement[0]).to.have.property('date', 123);
    expect(enregistrement[0]).to.have.property('sessionId', sessionId);
    expect(enregistrement[0]).to.have.property('situation', situation);
  });
});
