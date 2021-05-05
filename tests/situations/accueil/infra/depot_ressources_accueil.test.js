import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import chargeurs from '../../commun/aides/mock_chargeurs';

import batimentTri from 'accueil/assets/batiment-tri.png';
import batimentInventaire from 'accueil/assets/batiment-inventaire.png';
import batimentControle from 'accueil/assets/batiment-controle.png';

describe('Le dépôt de ressources de la situation accueil', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesAccueil(chargeurs());
    return depot.chargement();
  });

  it('étend DepotRessources', function () {
    expect(depot).toBeInstanceOf(DepotRessources);
  });

  it("retourne la consigne d'accueil", function () {
    expect(depot.consigneDemarrage()).not.toBe(undefined);
  });

  it('retourne les bâtiments', function () {
    expect(depot.batimentSituation('tri')).toEqual(batimentTri);
    expect(depot.batimentSituation('inventaire')).toEqual(batimentInventaire);
    expect(depot.batimentSituation('controle')).toEqual(batimentControle);
  });

  it('Peut dire si un batiment existe', function () {
    expect(depot.existeBatimentSituation('situation inconnue')).toBe(false);
    expect(depot.existeBatimentSituation('tri')).toBe(true);
  });
});
