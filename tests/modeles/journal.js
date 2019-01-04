import { Journal } from '../../src/modeles/journal.js';
import { MockDepot } from '../aides/mockDepot.js';
import { unContenantVrac } from '../aides/contenant.js';

describe('le journal', function () {
  let journal;
  let mockMaintenant;
  let mockDepot;

  const stock = [
    unContenantVrac('Vrac Sky', 1),
    unContenantVrac('Vrac TERRA', 2)
  ];

  beforeEach(function () {
    mockMaintenant = () => { return 123; };
    mockDepot = new MockDepot();
    journal = new Journal(mockMaintenant, mockDepot);
  });

  it("enregistre l'ouverture d'un contenant", function () {
    journal.enregistreOuvertureContenant(stock[0]);
    journal.enregistreOuvertureContenant(stock[1]);

    const enregistrement = mockDepot.getContenu();
    expect(enregistrement.length).to.equal(2);
    expect(enregistrement).to.eql([
      {
        date: 123,
        type: 'ouvertureContenant',
        valeur: stock[0]
      },
      {
        date: 123,
        type: 'ouvertureContenant',
        valeur: stock[1]
      }
    ]);
  });
});
