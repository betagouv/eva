import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesPlaceDuMarche from 'place_du_marche/infra/depot_ressources_place_du_marche';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot ressource de la situation Place du marché', function () {
  function mockRegistreCampagne(question) {
    return {
      questions: jest.fn().mockReturnValue([question])
    };
  }

  function mockQuestions(question) {
    const registre = mockRegistreCampagne(question);
    const depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
    return depot.questions();
  }

  it('étend DépotRessourcesCommune', function () {
    const registre = mockRegistreCampagne({});
    const depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  describe("#questions", function() {
    it("retourne les questions du serveur", function() {
      const questions = mockQuestions({ id: 1, nom_technique: 'N1Prn1' });
      expect(questions).toEqual([
        {
          id: 1,
          nom_technique: "N1Prn1",
        }
      ]);
    });

    it("charge les choix des questions", function() {
      const questions = mockQuestions({ id: 1, nom_technique: 'N1Prn1', choix: [{ type_choix: 'bon' }] });
      expect(questions[0].choix).toEqual([{ bonneReponse: true }]);
    });

    it("definie l'extension vue pour le type clic dans image", function() {
      const questions = mockQuestions({ id: 1, nom_technique: 'N1Prn1', type: 'clic-dans-image' });
      expect(questions[0].extensionVue).toEqual('clic-dans-image' );
    });


    it("definie l'extension vue pour le type glisser déposer", function() {
      const questions = mockQuestions({ id: 1, nom_technique: 'N1Prn1', type: 'glisser-deposer' });
      expect(questions[0].extensionVue).toEqual('glisser-deposer' );
    });
  });

  describe("#consigneDemarrage", function() {
    let depot;
    let messagesAudios;
    let sonConsigne;
    let consigneEnCours;

    beforeEach(function() {
      const registre = mockRegistreCampagne({ id: 1, nom_technique: 'N1Prn1'});
      messagesAudios = { consigneEnCours: 'N1Prn1_consigne.mp3' };
      sonConsigne = 'consigne_place_du_marche.mp3';
      depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
      depot.messagesAudios = messagesAudios;
      depot.sonConsigne = sonConsigne;
      depot.ressource = jest.fn((src) => src);
    });

    it("retourne la consigne audio d'une consgine s'il y en a une", function() {
      depot.consigneEnCours = consigneEnCours;
      depot.existeMessageAudio = jest.fn(() => true);
      expect(depot.consigneDemarrage()).toEqual(messagesAudios[0]);
    });

    it("retourne la consigne audio du démarrage par défaut", function() {
      depot.existeMessageAudio = jest.fn(() => false);
      expect(depot.consigneDemarrage()).toEqual(sonConsigne);
    });
  });
});
