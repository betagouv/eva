import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépot de ressources communes', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesCommunes(chargeurs());
  });

  it('étend DépotRessources', function () {
    expect(depot).to.be.a(DepotRessources);
  });

  it('charge des ressources communes', function () {
    expect(depot.promesses.length).not.to.equal(0);
  });
});
