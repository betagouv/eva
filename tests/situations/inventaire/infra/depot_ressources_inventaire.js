import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesInventaire from 'inventaire/infra/depot_ressources_inventaire';

describe('Le dépôt de ressources de la situation inventaire', function () {
  it('étend DepotRessourcesCommunes', function () {
    const depot = new DepotRessourcesInventaire();
    expect(depot).to.be.a(DepotRessourcesCommunes);
  });
});
