import DepotRessources from 'commun/infra/depot_ressources';
import DepotRessourcesAccueil from 'accueil/infra/depot_ressources_accueil';
import chargeurs from '../../commun/aides/mock_chargeurs';

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
    expect(depot.consigneAccueil()).to.not.be(undefined);
  });

  it('retourne les bâtiments', function () {
    expect(depot.batimentSituation('tri')).to.eql('assets/tri.png');
    expect(depot.batimentSituation('inventaire')).to.eql('assets/inventaire.png');
    expect(depot.batimentSituation('controle')).to.eql('assets/controle.png');
  });
});
