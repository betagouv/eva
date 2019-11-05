import DepotRessources, { chargeurJSON } from 'commun/infra/depot_ressources';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('le dépôt de ressources', function () {
  it('permet de charger toutes les ressources', function () {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test2.png', 'test.wav']);
    expect(depot.promesses.length).to.equal(3);
  });

  it('résout la promesse lorsque toutes les ressources sont chargées', function (done) {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test.wav']);
    depot.chargement().then(() => done());
  });

  it('rejette la promesse lorsque une ressource est en erreur', function (done) {
    const depot = new DepotRessources({
      wav: () => Promise.resolve(),
      png: () => Promise.reject(new Error('test'))
    });
    depot.charge(['test.png', 'test.wav']);
    depot.chargement().catch(() => done());
  });

  it('sait charger des ressources en plusieurs fois', function () {
    const depot = new DepotRessources(chargeurs());
    depot.charge(['test.png', 'test.wav']);
    depot.charge(['unFichierSupplementaire.png']);

    expect(depot.promesses.length).to.equal(3);
  });

  it('sert les ressources chargées', function () {
    const depot = new DepotRessources({
      png: () => Promise.resolve(() => 'Une ressource')
    });

    depot.charge(['./etageres.png']);

    return depot.chargement().then(() => {
      const ressource = depot.ressource('./etageres.png');
      expect(ressource).to.equal('Une ressource');
    });
  });

  it('lance une exception explicite si le nom de la ressource est undefined', function () {
    const depot = new DepotRessources({ });
    expect(() => depot.ressource(undefined)).to.throwError(function (e) {
      expect(e).to.be.a(Error);
      expect(e.message).to.equal("Tentative de chargement d'une ressource dont le nom est 'undefined'");
    });
  });

  it('lance une exception explicite si le nom de la ressource est inconnu', function () {
    const depot = new DepotRessources({ });
    expect(() => depot.ressource('inconnu')).to.throwError(function (e) {
      expect(e).to.be.a(Error);
      expect(e.message).to.equal("Tentative de chargement d'une ressource dont le nom est 'inconnu'");
    });
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
      expect(nbAppels).to.equal(2);
    });
  });

  it('peut charger des resources json', function () {
    const jsonString = '{ cle: "valeur"}';
    window.fetch = (src) => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: () => jsonString
        });
      });
    };
    return chargeurJSON('./evaluations/134.json').then((cloneur) => {
      expect(cloneur()).to.equal(jsonString);
    });
  });

  it("gère les erreurs reseau lors du chargement d'une resource json", function () {
    window.fetch = (src) => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: false,
          status: 404
        });
      });
    };
    return chargeurJSON('./evaluations/134.json').catch((e) => {
      expect(e).to.be.a(Error);
      expect(e.message).to.equal('Le chargement de la resources ./evaluations/134.json a échoué avec le code 404');
    });
  });
});
