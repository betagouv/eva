import chargeurs, { chargeurDefaut } from '../../commun/aides/mock_chargeurs';
import DepotRessourcesBienvenue from 'bienvenue/infra/depot_ressources_bienvenue';
import bienvenueConcentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.wav';

describe('Le dépot ressource de la situation Bienvenue', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesBienvenue(chargeurs({ wav: chargeurDefaut }));
  });

  describe('charge les ressources audio', function () {
    beforeEach(function () {
      return depot.chargement();
    });

    it("Retourne le message audio d'une question", function () {
      expect(depot.messageAudio('bienvenue_1')).toBe(bienvenueConcentrationQuestion);
    });

    it("Teste l'existance d'un message audio d'une question", function () {
      expect(depot.existeMessageAudio('bienvenue_1')).toBe(true);
      expect(depot.existeMessageAudio('inconnu')).toBe(false);
    });
  });
});
