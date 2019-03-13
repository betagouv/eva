import { Contenant } from 'inventaire/modeles/contenant.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { MockDepot } from '../aides/mockDepot.js';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;
  const sessionId = 42;

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, sessionId, mockDepot);
  });

  it("enregistre l'appui sur le bouton de démarrage", function () {
    journal.enregistreDemarrage();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement).to.eql([
      {
        date: 123,
        sessionId,
        type: 'demarrage',
        donnees: {}
      }
    ]);
  });

  it("enregistre l'appui sur le bouton de stop", function () {
    journal.enregistreStop();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement).to.eql([
      {
        date: 123,
        sessionId,
        type: 'stop',
        donnees: {}
      }
    ]);
  });

  it("enregistre l'ouverture d'un contenant", function () {
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '9', quantite: 12 }, { nom: 'Nova Sky' }));
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '4', quantite: 7 }, { nom: 'Gink Cola' }));

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement).to.eql([
      {
        date: 123,
        sessionId,
        type: 'ouvertureContenant',
        donnees: { idProduit: '9', quantite: 12, contenu: { nom: 'Nova Sky' } }
      },
      {
        date: 123,
        sessionId,
        type: 'ouvertureContenant',
        donnees: { idProduit: '4', quantite: 7, contenu: { nom: 'Gink Cola' } }
      }
    ]);
  });

  it("enregistre l'ouverture de la saisie d'inventaire", function () {
    journal.enregistreOuvertureSaisieInventaire();

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(1);
    expect(enregistrement).to.eql([
      {
        date: 123,
        sessionId,
        type: 'ouvertureSaisieInventaire',
        donnees: {}
      }
    ]);
  });

  it("enregistre la saisie d'inventaire", function () {
    const detail = new Map();
    detail.set('1', '42');
    detail.set('2', '1');

    journal.enregistreSaisieInventaire(true, detail);
    journal.enregistreSaisieInventaire(false, detail);

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement).to.eql([
      {
        date: 123,
        sessionId,
        type: 'saisieInventaire',
        donnees: {
          resultat: true,
          reponses: {
            1: 42,
            2: 1
          }
        }
      },
      {
        date: 123,
        sessionId,
        type: 'saisieInventaire',
        donnees: {
          resultat: false,
          reponses: {
            1: 42,
            2: 1
          }
        }
      }
    ]);
  });
});
