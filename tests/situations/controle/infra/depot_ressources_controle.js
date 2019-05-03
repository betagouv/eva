import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import DepotRessourcesControle from 'controle/infra/depot_ressources_controle';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Le dépôt de ressources de la situation contrôle', function () {
  it('étend DepotRessourcesCommunes', function () {
    const depot = new DepotRessourcesControle(chargeurs());
    expect(depot).to.be.a(DepotRessourcesCommunes);
  });

  it('retourne la consigne', function () {
    const _chargeurs = chargeurs({
      mp3: () => Promise.resolve(() => 'plop')
    });
    const depot = new DepotRessourcesControle(_chargeurs);
    return depot.chargement().then(() => {
      expect(depot.consigne()).to.eql('plop');
    });
  });
});
