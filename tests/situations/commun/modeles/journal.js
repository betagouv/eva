import { Journal } from 'commun/modeles/journal.js';
import Evenement from 'commun/modeles/evenement.js';
import { MockDepot } from '../aides/mockDepot.js';

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
    journal.enregistreEvenement(new EvenementTest());

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.only.have.keys('date', 'sessionId', 'nom', 'donnees', 'situation');
    expect(enregistrement[0]).to.have.property('nom', 'test');
    expect(enregistrement[0]).to.have.property('date', 123);
    expect(enregistrement[0]).to.have.property('sessionId', sessionId);
    expect(enregistrement[0]).to.have.property('situation', situation);
  });

  it("enregistre l'ouverture de la saisie d'inventaire", function () {
    journal.enregistreOuvertureSaisieInventaire();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.have.property('nom', 'ouvertureSaisieInventaire');
  });

  it("enregistre la saisie d'inventaire", function () {
    const detail = new Map();
    detail.set('1', '42');
    detail.set('2', '1');

    journal.enregistreSaisieInventaire(true, detail);
    journal.enregistreSaisieInventaire(false, detail);

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement[0]).to.have.property('nom', 'saisieInventaire');
    expect(enregistrement[0].donnees).to.eql({
      resultat: true,
      reponses: {
        1: 42,
        2: 1
      }
    });
    expect(enregistrement[1].donnees).to.eql({
      resultat: false,
      reponses: {
        1: 42,
        2: 1
      }
    });
  });
});
