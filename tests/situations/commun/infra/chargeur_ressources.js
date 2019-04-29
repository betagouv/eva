import ChargeurRessources from 'commun/infra/chargeur_ressources';
import jsdom from 'jsdom-global';

describe('le chargeur de ressources', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it('permet de charger toutes les ressources', function () {
    const chargeur = new ChargeurRessources();
    chargeur.charge(['test.png', 'test2.png', 'test.mp3']);
    expect(chargeur.promesses.length).to.equal(3);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const chargeur = new ChargeurRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.resolve()
    });
    chargeur.charge(['test.png', 'test.mp3']);
    chargeur.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const chargeur = new ChargeurRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.reject(new Error('test'))
    });
    chargeur.charge(['test.png', 'test.mp3']);
    chargeur.chargement().catch(() => done());
  });

  it('sait charger des ressources en plusieurs fois', function () {
    const chargeur = new ChargeurRessources();
    chargeur.charge(['test.png', 'test.mp3']);
    chargeur.charge(['unFichierSupplementaire.png']);

    expect(chargeur.promesses.length).to.equal(3);
  });
});
