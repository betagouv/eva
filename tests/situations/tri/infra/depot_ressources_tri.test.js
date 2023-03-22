import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesTri from 'tri/infra/depot_ressources_tri';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépôt de ressources de la situation tri', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesTri(chargeurs());
    return depot.chargement();
  });

  it('étend DepotRessourcesCommunes', function () {
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  it('retourne les bonbons', function () {
    expect(depot.piece('bonbon1')).toBeDefined();
  });

  it('retourne le son de bon bac', function () {
    expect(depot.sonBonBac()).toBeDefined();
  });

  it('retourne le son de mauvais bac', function () {
    expect(depot.sonMauvaisBac()).toBeDefined();
  });
});
