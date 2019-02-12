import { Contenant } from 'inventaire/modeles/contenant.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { MockDepot } from '../aides/mockDepot.js';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, mockDepot);
  });

  it("enregistre l'ouverture d'un contenant", function () {
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '9', quantite: 12 }, { nom: 'Nova Sky' }));
    journal.enregistreOuvertureContenant(new Contenant({ idProduit: '4', quantite: 7 }, { nom: 'Gink Cola' }));

    const enregistrement = mockDepot.evenements();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement).to.eql([
      {
        date: 123,
        type: 'ouvertureContenant',
        description: { idProduit: '9', quantite: 12, contenu: { nom: 'Nova Sky' } }
      },
      {
        date: 123,
        type: 'ouvertureContenant',
        description: { idProduit: '4', quantite: 7, contenu: { nom: 'Gink Cola' } }
      }
    ]);
  });
});
