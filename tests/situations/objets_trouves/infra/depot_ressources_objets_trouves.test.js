import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.wav';
import messageMickael from 'objets_trouves/assets/repondeur-message-mickael.wav';
import messageRachel from 'objets_trouves/assets/repondeur-message-rachel.wav';

describe('Le dépot ressource de la situation Objects trouvés', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesObjetsTrouves(chargeurs());
  });

  describe('charge les ressources audio', function () {
    beforeEach(function () {
      return depot.chargement();
    });

    it("Retourne la réponse d'audio d'un QCM", function () {
      expect(depot.reponseAudio('agenda', 1)).toBe(sonChoix1);
      expect(depot.reponseAudio('questionnaire inconnu', 1)).toBe(undefined);
    });

    it("Retourne le message audio d'une question", function () {
      expect(depot.messageAudio('heure-bureau-mickael')).toBe(messageMickael);
      expect(depot.messageAudio('nombre-tours-de-manege')).toBe(messageRachel);
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
