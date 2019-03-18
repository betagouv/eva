import { Journal } from 'commun/modeles/journal.js';
import { Contenant } from 'inventaire/modeles/contenant.js';
import { MockDepot } from '../aides/mockDepot.js';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
  const sessionId = 42;
  const situation = 'inventaire';

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, sessionId, situation, mockDepot);
  });

  it("enregistre l'appui sur le bouton de démarrage", function () {
    journal.enregistreDemarrage();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.only.have.keys('date', 'sessionId', 'nom', 'donnees', 'situation');
    expect(enregistrement[0]).to.have.property('nom', 'demarrage');
    expect(enregistrement[0]).to.have.property('date', 123);
    expect(enregistrement[0]).to.have.property('sessionId', sessionId);
    expect(enregistrement[0]).to.have.property('situation', situation);
  });

  it("enregistre l'appui sur le bouton de stop", function () {
    journal.enregistreStop();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement[0]).to.have.property('nom', 'stop');
  });

  it("enregistre l'ouverture d'un contenant", function () {
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '9', quantite: 12 }, { nom: 'Nova Sky' }));
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '4', quantite: 7 }, { nom: 'Gink Cola' }));

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement[0]).to.have.property('nom', 'ouvertureContenant');
    expect(enregistrement[0].donnees).to.eql({ idProduit: '9', quantite: 12, contenu: { nom: 'Nova Sky' } });
    expect(enregistrement[1].donnees).to.eql({ idProduit: '4', quantite: 7, contenu: { nom: 'Gink Cola' } });
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
