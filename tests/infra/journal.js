import { Journal } from '../../src/infra/journal.js';
import jsdom from 'jsdom-global';

describe('le journal', function () {
  let journal;
  const mockMaintenant = () => { return 123; };

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    journal = new Journal(mockMaintenant);
  });

  it('enregistre les evenements dans le localStorage', function () {
    journal.enregistre('typeEvenement', { cle: 'valeur' });
    journal.enregistre('typeEvenement2', { autreCle: 'valeur2' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
    expect(lignes).to.eql([
      {
        date: 123,
        type: 'typeEvenement',
        valeur: { cle: 'valeur' }
      },
      {
        date: 123,
        type: 'typeEvenement2',
        valeur: { autreCle: 'valeur2' }
      }
    ]);
  });

  it("vérifie s'il n'existe pas un journal au démarrage et le charge", function () {
    journal.enregistre('typeEvenement', { cle: 'valeur' });

    journal = new Journal(mockMaintenant);
    journal.enregistre('typeEvenement', { cle: 'valeur' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
  });
});
