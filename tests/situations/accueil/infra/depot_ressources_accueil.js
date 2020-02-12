import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import chargeurs from '../../commun/aides/mock_chargeurs';

import batimentTri from 'accueil/assets/tri.png';
import batimentInventaire from 'accueil/assets/inventaire.png';
import batimentControle from 'accueil/assets/controle.png';

describe('Le dépôt de ressources de la situation accueil', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesAccueil(chargeurs());
    return depot.chargement();
  });

  it('étend DepotRessources', function () {
    expect(depot).to.be.a(DepotRessources);
  });

  it("retourne la consigne d'accueil", function () {
    expect(depot.consigneDemarrage()).to.not.be(undefined);
  });

  it('retourne les bâtiments', function () {
    expect(depot.batimentSituation('tri')).to.eql(batimentTri);
    expect(depot.batimentSituation('inventaire')).to.eql(batimentInventaire);
    expect(depot.batimentSituation('controle')).to.eql(batimentControle);
  });
});
