import chargeurs, { chargeurDefaut } from '../../commun/aides/mock_chargeurs';
import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.mp3';

describe('Le dépot ressource de la situation Objects trouvés', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesObjetsTrouves(chargeurs({ mp3: chargeurDefaut }));
  });

  describe('charge les ressources audio', function () {
    beforeEach(function () {
      return depot.chargement();
    });

    it("Retourne la réponse d'audio d'un QCM", function () {
      expect(depot.reponseAudio('agenda', 0)).toBe(sonChoix1);
      expect(depot.reponseAudio('questionnaire inconnu', 0)).toBe(undefined);
    });
  });
});
