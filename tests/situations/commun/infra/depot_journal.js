import DepotJournal from 'commun/infra/depot_journal';
import jsdom from 'jsdom-global';

describe('le depot du journal', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it('fait un POST des lignes du journal vers le serveur', function () {
    const requetes = [];
    const depot = new DepotJournal({ ajax (params) { requetes.push(params); } });
    depot.enregistre({ autreCle: 'valeur2', description: { cle: 'valeur2' } });

    expect(requetes.length).to.equal(1);
    expect(requetes[0]['type']).to.equal('POST');
  });

  it('retourne une promesse standard javascript', function () {
    const depot = new DepotJournal({ ajax (params) {} });

    expect(depot.enregistre({})).to.be.a(Promise);
  });
});
