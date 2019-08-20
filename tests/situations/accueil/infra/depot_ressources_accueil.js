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

  it('retourne les bâtiments', function () {
    expect(depot.batimentSituation('tri')).to.eql('assets/tri.png');
    expect(depot.batimentSituation('inventaire')).to.eql('assets/inventaire.png');
    expect(depot.batimentSituation('controle')).to.eql('assets/controle.png');
  });

  it('retourne les chemins de progression', function () {
    expect(depot.progression(1, 5)).to.eql('assets/progression1-sur-5.png');
    expect(depot.progression(2, 4)).to.eql('assets/progression2-sur-4.png');
  });

  it('retourne le premier chemin de progression si le dernier niveau est inconnue', function () {
    expect(depot.progression(1, undefined)).to.eql('assets/progression1-sur-4.png');
  });
});
