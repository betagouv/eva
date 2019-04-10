import { DepotJournal } from 'commun/infra/depot_journal';
import jsdom from 'jsdom-global';

describe('le depot du journal', function () {
  let depot;
  let requetes = [];

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    requetes = [];
    depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
  });

  it('fait un POST des lignes du journal vers le serveur', function () {
    depot.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

    expect(requetes.length).to.equal(1);
    expect(requetes[0]['type']).to.equal('POST');
  });
});
