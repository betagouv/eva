import chargeurs, { chargeurDefaut } from '../../commun/aides/mock_chargeurs';
import DepotRessourcesPlanDeLaVille from 'plan_de_la_ville/infra/depot_ressources_plan_de_la_ville';
import maisonRouge from 'plan_de_la_ville/assets/audio_questions/maison_rouge.wav';

describe('le dépôt ressource de la situation plan de la ville', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesPlanDeLaVille(chargeurs({ wav: chargeurDefaut }));
  });

  describe('charge les ressources visuelles', function () {
    it('de la configuration normale', function () {
      depot.chargeConfigurations({
        questions: [{ illustration: 'chemin_illustration.png' }]
      });

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).not.toBe(undefined);
      });
    });
  });

  describe('charge les ressources audios', function () {
    beforeEach(function () {
      return depot.chargement();
    });

    it("Retourne le message audio d'une question", function () {
      expect(depot.messageAudio('couleur_maison')).toBe(maisonRouge);
    });

    it("Teste l'existance d'un message audio d'une question", function () {
      expect(depot.existeMessageAudio('couleur_maison')).toBe(true);
      expect(depot.existeMessageAudio('inconnu')).toBe(false);
    });
  });
});
