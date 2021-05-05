import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesControle from 'controle/infra/depot_ressources_controle';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépôt de ressources de la situation contrôle', function () {
  it('étend DepotRessourcesCommunes', function () {
    const depot = new DepotRessourcesControle(chargeurs());
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  it('retourne les biscuits en défaut', function () {
    const depot = new DepotRessourcesControle(chargeurs());
    expect(depot.piece('def9')).not.toBe(undefined);
  });

  it('retourne le biscuit normal', function () {
    const depot = new DepotRessourcesControle(chargeurs());
    expect(depot.piece('biscuit-normal')).not.toBe(undefined);
  });
});
