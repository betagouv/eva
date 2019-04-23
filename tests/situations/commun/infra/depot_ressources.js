import DepotRessources from 'commun/infra/depot_ressources';
import jsdom from 'jsdom-global';

describe('le depot de ressources', function () {
  let depot;

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    depot = new DepotRessources();
  });

  it("permet de charger toutes les ressources d'un répertoire", function () {
    depot.charge(require.context('./ressources'), 'identifiant-repertoire');
    const image = depot.image('identifiant-repertoire/monimage.png');
    expect(image).to.be.a(window.Image);
    expect(image.src).to.equal('http://localhost/assets/monimage.png');
  });

  it('retourne une instance différente à chaque appel', function () {
    depot.charge(require.context('./ressources'), 'identifiant-repertoire');
    const image1 = depot.image('identifiant-repertoire/monimage.png');
    const image2 = depot.image('identifiant-repertoire/monimage.png');
    expect(image1).to.not.equal(image2);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    depot.charge(require.context('./ressources'), 'identifiant-repertoire');
    images[0].onload();
    images[1].onload();
    depot.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    depot.charge(require.context('./ressources'), 'identifiant-repertoire');
    images[0].onerror();
    depot.chargement().catch(done);
  });
});
