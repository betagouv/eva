import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesTri from 'tri/infra/depot_ressources_tri';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépôt de ressources de la situation tri', function () {
  it('étend DepotRessourcesCommunes', function () {
    const depot = new DepotRessourcesTri(chargeurs());
    expect(depot).to.be.a(DepotRessourcesCommunes);
  });
});
