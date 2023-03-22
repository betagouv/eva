import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesPlanDeLaVille from 'plan_de_la_ville/infra/depot_ressources_plan_de_la_ville';

describe('le dépôt ressource de la situation plan de la ville', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesPlanDeLaVille(chargeurs());
  });

  describe('#chargeIllustrationsConfigurations', function () {
    it('charge les ressources visuelles de plan de la ville', function () {
      depot.chargeIllustrationsConfigurations([{
        questions: [{ illustration: 'chemin_illustration.png' }]
      }]);

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).toBeDefined();
      });
    });
  });
});
