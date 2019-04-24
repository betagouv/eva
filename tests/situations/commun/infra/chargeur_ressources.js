import ChargeurRessources from 'commun/infra/chargeur_ressources';
import jsdom from 'jsdom-global';

describe('le chargeur de ressources', function () {
  let chargeur;

  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
    chargeur = new ChargeurRessources();
  });

  it("permet de charger toutes les ressources d'un répertoire", function () {
    chargeur.charge(require.context('./ressources'));
    expect(chargeur.promesses.length).to.equal(2);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    chargeur.charge(require.context('./ressources'));
    images[0].onload();
    images[1].onload();
    chargeur.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    chargeur.charge(require.context('./ressources'));
    images[0].onerror();
    chargeur.chargement().catch(done);
  });
});
