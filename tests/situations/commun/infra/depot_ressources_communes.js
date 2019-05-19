import chargeurs from '../aides/mock_chargeurs';
import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot de ressources communes', function () {
  let depot;
  let son;
  let dernierSonCharge;

  beforeEach(function () {
    son = 'test.mp3';
    const _chargeurs = chargeurs({
      mp3: (_son) => {
        dernierSonCharge = _son;
        return Promise.resolve(() => 'mp3_precharge');
      }
    });
    depot = new DepotRessourcesCommunes(son, _chargeurs);
  });

  it('étend DépotRessources', function () {
    expect(depot).to.be.a(DepotRessources);
  });

  it('charge des ressources communes', function () {
    expect(depot.promesses.length).not.to.equal(0);
  });

  it('charge la consigne', function () {
    expect(dernierSonCharge).to.equal(son);
  });

  it('retourne la consigne', function () {
    return depot.chargement().then(() => {
      expect(depot.consigne()).to.eql('mp3_precharge');
    });
  });

  it('retourne la consigne commune', function () {
    return depot.chargement().then(() => {
      expect(depot.consigneCommune()).to.eql('mp3_precharge');
    });
  });
});
