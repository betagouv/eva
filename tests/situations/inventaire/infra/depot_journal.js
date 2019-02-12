import { DepotJournal } from 'inventaire/infra/depot_journal.js';
import jsdom from 'jsdom-global';

describe('le depot du journal', function () {
  let journal;

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    journal = new DepotJournal();
  });

  it('enregistre les lignes du journal dans le localStorage', function () {
    journal.enregistre({ cle: 'valeur' });
    journal.enregistre({ autreCle: 'valeur2' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
    expect(lignes).to.eql([
      { cle: 'valeur' },
      { autreCle: 'valeur2' }
    ]);
  });

  it("vérifie s'il n'existe pas un journal au démarrage et le charge", function () {
    journal.enregistre('typeEvenement', { cle: 'valeur' });

    journal = new DepotJournal();
    journal.enregistre('typeEvenement', { cle: 'valeur' });

    const lignes = JSON.parse(window.localStorage.getItem('journal'));
    expect(lignes.length).to.equal(2);
  });

  it('retourne les lignes du journal', function () {
    journal.enregistre({ cle: 'valeur' });
    journal.enregistre({ cle: 'valeur2' });

    expect(journal.evenements()).to.eql([
      { 'cle': 'valeur' },
      { 'cle': 'valeur2' }
    ]
    );
  });
});
