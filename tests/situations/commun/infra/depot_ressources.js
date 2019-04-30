import DepotRessources from 'commun/infra/depot_ressources';
import jsdom from 'jsdom-global';

describe('le dépôt de ressources', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it('permet de charger toutes les ressources', function () {
    const depot = new DepotRessources();
    depot.charge(['test.png', 'test2.png', 'test.mp3']);
    expect(depot.promesses.length).to.equal(3);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const depot = new DepotRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.resolve()
    });
    depot.charge(['test.png', 'test.mp3']);
    depot.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const depot = new DepotRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.reject(new Error('test'))
    });
    depot.charge(['test.png', 'test.mp3']);
    depot.chargement().catch(() => done());
  });

  it('sait charger des ressources en plusieurs fois', function () {
    const depot = new DepotRessources();
    depot.charge(['test.png', 'test.mp3']);
    depot.charge(['unFichierSupplementaire.png']);

    expect(depot.promesses.length).to.equal(3);
  });
});
