import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesPlaceDuMarche from 'place_du_marche/infra/depot_ressources_place_du_marche';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot ressource de la situation Place du marché', function () {
  function mockRegistreCampagne(question) {
    return {
      questions: jest.fn().mockReturnValue([question])
    };
  }

  it('étend DépotRessourcesCommune', function () {
    const registre = mockRegistreCampagne({});
    const depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  describe("#questions", function() {
    it("retourne les questions du serveur", function() {
      const registre = mockRegistreCampagne({ id: 1, nom_technique: 'N1Prn1' });
      const depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
      const questions = depot.questions();
      expect(questions).toEqual([
        {
          id: 1,
          nom_technique: "N1Prn1"
        }
      ]);
    });

    it("charge les choix des questions", function() {
      const registre = mockRegistreCampagne({ id: 1, nom_technique: 'N1Prn1', choix: [{ type_choix: 'bon' }] });
      const depot = new DepotRessourcesPlaceDuMarche(chargeurs(), registre);
      const questions = depot.questions();
      expect(questions[0].choix).toEqual([{ bonneReponse: true }]);
    });
  });
});
