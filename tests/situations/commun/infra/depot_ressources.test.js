import DepotRessources, { chargeurAudio, chargeurJSON, chargeurInlineSvg } from 'commun/infra/depot_ressources';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('le dépôt de ressources', function () {
  it('permet de charger toutes les ressources', function () {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test2.png', 'test.mp3', 'test.mp4', 'test.jpeg']);
    expect(depot.promesses.length).toBe(5);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test.mp3', 'test.mp4']);
    depot.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const une_erreur = new Error('cette erreur doit être attrapée et traitée');
    const depot = new DepotRessources({
      mp3: () => Promise.resolve(),
      png: () => Promise.reject(une_erreur)
    });
    depot.charge(['test.png', 'test.mp3']);
    depot.chargement().catch((erreur) => {
      expect(erreur).toEqual(une_erreur);
      done();
    });
  });

  it('sait charger des ressources en plusieurs fois', function () {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test.mp3']);
    depot.charge(['unFichierSupplementaire.png']);

    expect(depot.promesses.length).toBe(3);
  });

  it('sert les ressources chargées', function () {
    const depot = new DepotRessources({
      png: () => Promise.resolve(() => 'Une ressource')
    });

    depot.charge(['./etageres.png']);

    return depot.chargement().then(() => {
      const ressource = depot.ressource('./etageres.png');
      expect(ressource).toBe('Une ressource');
    });
  });

  it("lance un exception explicite si l'extension n'est pas gérée", function () {
    const depot = new DepotRessources({
    });

    expect(() => depot.charge(['./etageres.png']))
      .toThrow(new Error("Aucun chargeur disponible pour 'png'. Impossible de charger la ressource './etageres.png'"));
  });

  it('lance une exception explicite si le nom de la ressource est undefined', function () {
    const depot = new DepotRessources({ });
    expect(() => depot.ressource(undefined))
      .toThrow(new Error("Tentative de chargement d'une ressource dont le nom est 'undefined'"));
  });

  it('lance une exception explicite si le nom de la ressource est inconnu', function () {
    const depot = new DepotRessources({ });
    expect(() => depot.ressource('inconnu'))
      .toThrow(new Error("Tentative de chargement d'une ressource dont le nom est 'inconnu'"));
  });

  it('clone les ressources servies', function () {
    let nbAppels = 0;
    const depot = new DepotRessources({
      png: () => Promise.resolve(() => nbAppels++)
    });

    depot.charge(['./etageres.png']);

    return depot.chargement().then(() => {
      depot.ressource('./etageres.png');
      depot.ressource('./etageres.png');
      expect(nbAppels).toBe(2);
    });
  });

  it('peut charger des resources json', function () {
    const jsonString = '{ cle: "valeur"}';
    window.fetch = () => {
      return new Promise((resolve) => {
        resolve({
          ok: true,
          json: () => jsonString
        });
      });
    };
    return chargeurJSON('./evaluations/134.json').then((cloneur) => {
      expect(cloneur()).toBe(jsonString);
    });
  });

  it("gère les erreurs reseau lors du chargement d'une resource json", function () {
    window.fetch = () => {
      return new Promise((resolve) => {
        resolve({
          ok: false,
          status: 404
        });
      });
    };
    return chargeurJSON('./evaluations/134.json').catch((e) => {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Le chargement de la ressource ./evaluations/134.json a échoué avec le code 404');
    });
  });

  describe('limite les téléchargements simultanés', function () {
    function chargeurControle () {
      const enAttente = [];
      let enCours = 0;
      let maxEnCours = 0;
      const chargeur = (src) => {
        enCours++;
        maxEnCours = Math.max(maxEnCours, enCours);
        return new Promise((resolve) => {
          enAttente.push(() => {
            enCours--;
            resolve(() => src);
          });
        });
      };
      const termineTout = () => {
        if (enAttente.length === 0) return Promise.resolve();
        while (enAttente.length) enAttente.shift()();
        return new Promise((resolve) => setTimeout(resolve, 0)).then(termineTout);
      };
      return { chargeur, enAttente, maxEnCours: () => maxEnCours, termineTout };
    }

    it('ne lance pas plus de téléchargements que la limite', function () {
      const controle = chargeurControle();
      const depot = new DepotRessources({ png: controle.chargeur }, { maxSimultanes: 3 });
      depot.charge(['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']);

      return Promise.resolve()
        .then(() => {
          expect(controle.enAttente.length).toBe(3);
          return controle.termineTout();
        })
        .then(() => depot.chargement())
        .then(() => {
          expect(controle.maxEnCours()).toBe(3);
          expect(depot.ressource('7.png')).toBe('7.png');
        });
    });

    it('applique la limite sur plusieurs appels à charge', function () {
      const controle = chargeurControle();
      const depot = new DepotRessources({ png: controle.chargeur }, { maxSimultanes: 2 });
      depot.charge(['1.png', '2.png']);
      depot.charge(['3.png', '4.png']);

      return Promise.resolve().then(() => {
        expect(controle.enAttente.length).toBe(2);
      });
    });

    it("lance la ressource suivante lorsqu'une ressource échoue", function () {
      const depot = new DepotRessources({
        png: (src) => src === '1.png' ? Promise.reject(new Error('échec')) : Promise.resolve(() => src)
      }, { maxSimultanes: 1 });
      depot.charge(['1.png', '2.png']);
      depot.promesses[0].catch(() => {});

      return depot.promesses[1].then(() => {
        expect(depot.ressource('2.png')).toBe('2.png');
      });
    });
  });

  describe('réessaie les ressources en échec temporaire', function () {
    function erreurReessayable () {
      const erreur = new Error('HTTP 503');
      erreur.reessayable = true;
      return erreur;
    }

    function depotAvecEchecs (nombreEchecs, erreur, options = {}) {
      const appels = [];
      const attentes = [];
      const depot = new DepotRessources({
        mp3: (src) => {
          appels.push(src);
          if (appels.length <= nombreEchecs) return Promise.reject(erreur());
          return Promise.resolve(() => src);
        }
      }, {
        attendre: (ms) => { attentes.push(ms); return Promise.resolve(); },
        ...options
      });
      return { depot, appels, attentes };
    }

    it("réessaie une ressource en erreur réessayable jusqu'à la réussite", function () {
      const { depot, appels } = depotAvecEchecs(2, erreurReessayable);
      depot.charge(['son.mp3']);

      return depot.chargement().then(() => {
        expect(appels.length).toBe(3);
        expect(depot.ressource('son.mp3')).toBe('son.mp3');
      });
    });

    it('attend de plus en plus longtemps entre chaque essai', function () {
      const { depot, attentes } = depotAvecEchecs(3, erreurReessayable, { delaiInitial: 100, nombreEssais: 4 });
      depot.charge(['son.mp3']);

      return depot.chargement().then(() => {
        expect(attentes).toEqual([100, 200, 400]);
      });
    });

    it("abandonne après le nombre maximal d'essais", function () {
      const { depot, appels } = depotAvecEchecs(10, erreurReessayable, { nombreEssais: 3 });
      depot.charge(['son.mp3']);

      return depot.chargement().then(
        () => { throw new Error('aurait dû échouer'); },
        (erreur) => {
          expect(erreur.message).toBe('HTTP 503');
          expect(appels.length).toBe(3);
        }
      );
    });

    it('ne réessaie pas une erreur définitive', function () {
      const { depot, appels } = depotAvecEchecs(1, () => new Error('HTTP 404'));
      depot.charge(['son.mp3']);

      return depot.chargement().then(
        () => { throw new Error('aurait dû échouer'); },
        (erreur) => {
          expect(erreur.message).toBe('HTTP 404');
          expect(appels.length).toBe(1);
        }
      );
    });
  });

  describe('#chargeurAudio', function () {
    let xhrOriginal;
    let audioContextOriginal;

    beforeEach(function () {
      xhrOriginal = window.XMLHttpRequest;
      audioContextOriginal = window.AudioContext;
      window.AudioContext = class { decodeAudioData () {} };
    });

    afterEach(function () {
      window.XMLHttpRequest = xhrOriginal;
      window.AudioContext = audioContextOriginal;
    });

    function simuleXhr (comportement) {
      window.XMLHttpRequest = class {
        open () {}
        send () { comportement(this); }
      };
    }

    it('rejette avec une erreur réessayable sur un 503', function () {
      simuleXhr((xhr) => { xhr.status = 503; xhr.onload(); });
      expect.assertions(2);
      return chargeurAudio('son.mp3').catch((erreur) => {
        expect(erreur.status).toBe(503);
        expect(erreur.reessayable).toBe(true);
      });
    });

    it('rejette avec une erreur définitive sur un 404', function () {
      simuleXhr((xhr) => { xhr.status = 404; xhr.onload(); });
      expect.assertions(2);
      return chargeurAudio('son.mp3').catch((erreur) => {
        expect(erreur.status).toBe(404);
        expect(erreur.reessayable).toBe(false);
      });
    });

    it('rejette avec une erreur réessayable sur une erreur réseau', function () {
      simuleXhr((xhr) => { xhr.onerror(); });
      expect.assertions(1);
      return chargeurAudio('son.mp3').catch((erreur) => {
        expect(erreur.reessayable).toBe(true);
      });
    });
  });

  it('marque comme réessayable un 503 sur une ressource json', function () {
    window.fetch = () => Promise.resolve({ ok: false, status: 503 });
    expect.assertions(1);
    return chargeurJSON('./evaluations/134.json').catch((e) => {
      expect(e.reessayable).toBe(true);
    });
  });

  it('marque comme réessayable une erreur réseau sur une ressource json', function () {
    window.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
    expect.assertions(1);
    return chargeurJSON('./evaluations/134.json').catch((e) => {
      expect(e.reessayable).toBe(true);
    });
  });

  it('marque comme réessayable un 503 sur un svg inline', function () {
    window.fetch = () => Promise.resolve({ ok: false, status: 503 });
    expect.assertions(1);
    return chargeurInlineSvg('question.svg').catch((e) => {
      expect(e.reessayable).toBe(true);
    });
  });

  describe('#chargeurInlineSvg', function () {
    it("charge le contenu SVG depuis une URL et retourne l'Element SVG", function () {
      const svgString = `<svg><circle class="bonne-reponse"/><path/></svg>`;
      window.fetch = () => {
        return new Promise((resolve) => {
          resolve({
            ok: true,
            text: () => svgString
          });
        });
      };
      return chargeurInlineSvg('http://localhost/assets/question1.svg').then((cloneur) => {
        expect(cloneur().outerHTML).toBe(svgString);
      });
    });
  });
});
