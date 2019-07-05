import { Journal } from 'commun/modeles/journal';
import Evenement from 'commun/modeles/evenement';
import MockDepot from '../aides/mock_depot';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
  const registre = { identifiant () {} };
  const sessionId = 42;
  const identifiantSituation = 'inventaire';

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, sessionId, identifiantSituation, mockDepot, registre);
  });

  it('enregistre un événement', function () {
    registre.identifiant = () => 'identifiant utilisateur';
    journal.enregistre(new Evenement('test'));

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.only.have.keys('date', 'session_id', 'nom', 'donnees', 'situation', 'evaluation_id');
    expect(enregistrement[0]).to.have.property('nom', 'test');
    expect(enregistrement[0]).to.have.property('date', 123);
    expect(enregistrement[0]).to.have.property('session_id', sessionId);
    expect(enregistrement[0]).to.have.property('situation', identifiantSituation);
    expect(enregistrement[0]).to.have.property('evaluation_id', 'identifiant utilisateur');
  });

  it('enregistre la situation faite', function (done) {
    registre.enregistreSituationFaite = (nomSituation) => {
      expect(nomSituation).to.eql('nom situation');
      done();
    };
    journal.situation = 'nom situation';
    journal.enregistreSituationFaite();
  });
});
