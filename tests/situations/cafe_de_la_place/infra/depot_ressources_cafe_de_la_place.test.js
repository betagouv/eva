import chargeurs, { chargeurDefaut } from '../../commun/aides/mock_chargeurs';
import DepotRessourcesCafeDeLaPlace from 'cafe_de_la_place/infra/depot_ressources_cafe_de_la_place';

describe('le dépôt ressource de la situation café de la place', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesCafeDeLaPlace(chargeurs({ mp3: chargeurDefaut }));
  });

  describe('#chargeConfigurations', function () {
    it('charge les ressources visuelles', function () {
      depot.chargeConfigurations({
        questions: [{ illustration: 'chemin_illustration.png' }]
      });

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).not.toBe(undefined);
      });
    });
  });
});
