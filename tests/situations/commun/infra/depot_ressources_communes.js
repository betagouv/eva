import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépot de ressources communes', function () {
  let depot;
  let son;

  beforeEach(function () {
    son = 'test.mp3';
    depot = new DepotRessourcesCommunes(son, chargeurs());
  });

  it('étend DépotRessources', function () {
    expect(depot).to.be.a(DepotRessources);
  });

  it('charge des ressources communes', function () {
    expect(depot.promesses.length).not.to.equal(0);
  });

  it('retourne la consigne', function () {
    const _chargeurs = chargeurs({
      mp3: () => Promise.resolve(() => 'plop')
    });
    depot = new DepotRessourcesCommunes(son, _chargeurs);
    return depot.chargement().then(() => {
      expect(depot.consigne()).to.eql('plop');
    });
  });

  it('retourne la consigne commune', function () {
    return depot.chargement().then(() => {
      expect(depot.consigneCommune()).to.not.be(undefined);
    });
  });
});
