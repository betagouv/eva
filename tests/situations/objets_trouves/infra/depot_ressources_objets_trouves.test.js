import chargeurs, { chargeurDefaut } from '../../commun/aides/mock_chargeurs';
import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.wav';

describe('Le dépot ressource de la situation Objects trouvés', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesObjetsTrouves(chargeurs({ wav: chargeurDefaut }));
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

  describe('charge les ressources visuelles', function () {
    it('de la configuration entrainement', function () {
      depot.chargeConfigurations({
        apps: {
          agenda: [{ illustration: 'chemin_illustration.png', icone: 'chemin_icone.png' }]
        }
      }, {});

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).not.toBe(undefined);
        expect(depot.ressource('chemin_icone.png')).not.toBe(undefined);
      });
    });

    it('de la configuration normale', function () {
      depot.chargeConfigurations({}, {
        appsAccueilVerrouille: {
          deverouillage: [{ illustration: 'chemin_illustration_deverouillage.png', icone: 'chemin_icone_deverrouillage.png' }]
        },
        apps: {
          agenda: [{ illustration: 'chemin_illustration.png', icone: 'chemin_icone.png' }]
        }
      });

      return depot.chargement().then(function () {
        expect(depot.ressource('chemin_illustration.png')).not.toBe(undefined);
        expect(depot.ressource('chemin_icone.png')).not.toBe(undefined);
        expect(depot.ressource('chemin_illustration_deverouillage.png')).not.toBe(undefined);
        expect(depot.ressource('chemin_icone_deverrouillage.png')).not.toBe(undefined);
      });
    });
  });
});
