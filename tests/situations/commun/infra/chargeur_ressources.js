import ChargeurRessources, { chargeurAudio, chargeurImage } from 'commun/infra/chargeur_ressources';
import jsdom from 'jsdom-global';

describe('le chargeur de ressources', function () {
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it("permet de charger toutes les ressources d'un répertoire", function () {
    const chargeur = new ChargeurRessources();
    chargeur.charge(require.context('./ressources'));
    expect(chargeur.promesses.length).to.equal(3);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const chargeur = new ChargeurRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.resolve()
    });
    chargeur.charge(require.context('./ressources'));
    chargeur.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const chargeur = new ChargeurRessources({
      'mp3': (src) => Promise.resolve(),
      'png': (src) => Promise.reject(new Error('test'))
    });
    chargeur.charge(require.context('./ressources'));
    chargeur.chargement().catch(() => done());
  });
});

describe('le chargeur audio', function () {
  it('résout la promesse', function (done) {
    const sons = [];
    window.Audio = class {
      constructor (src) {
        expect(src).to.equal('test.mp3');
      }

      addEventListener (nomEvenement, callback) {
        if (nomEvenement === 'canplaythrough') {
          sons.push(callback);
        }
      }
    };
    chargeurAudio('test.mp3').then(() => done());
    sons[0]();
  });

  it('rejette la promesse', function (done) {
    const sons = [];
    window.Audio = class {
      addEventListener (nomEvenement, callback) {
        if (nomEvenement === 'error') {
          sons.push(callback);
        }
      }
    };
    chargeurAudio('test.mp3').catch(() => done());
    sons[0]();
  });
});

describe("le chargeur d'image", function () {
  it('résout la promesse', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    chargeurImage('test.png').then(() => done());
    images[0].onload();
    expect(images[0].src).to.equal('test.png');
  });

  it('rejette la promesse', function (done) {
    const images = [];
    window.Image = class {
      constructor () {
        images.push(this);
      }
    };
    chargeurImage('test.png').catch(() => done());
    images[0].onerror();
  });
});
