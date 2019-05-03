import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesInventaire from 'inventaire/infra/depot_ressources_inventaire';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépôt de ressources de la situation inventaire', function () {
  it('étend DepotRessourcesCommunes', function () {
    const depot = new DepotRessourcesInventaire(chargeurs());
    expect(depot).to.be.a(DepotRessourcesCommunes);
  });

  it('retourne la consigne', function () {
    const _chargeurs = chargeurs({
      mp3: () => Promise.resolve(() => 'plop')
    });
    const depot = new DepotRessourcesInventaire(_chargeurs);
    return depot.chargement().then(() => {
      expect(depot.consigne()).to.eql('plop');
    });
  });
});
