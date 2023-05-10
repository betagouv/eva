import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import CetC1 from 'questions/assets/illustration_questions/CetC1.jpg';

describe('Le dépot ressource de la situation Question', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesQuestions(chargeurs());
  });

  it('étend DépotRessourcesCommune', function () {
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });

  it('fourni une aide complementaire', function () {
    expect(depot.imageAideComplementaire()).toEqual(depot.calculatrice());
  });

  describe("#illustrationQuestion", function() {
    it("Retourne l'illustration d'une question", function () {
      expect(depot.illustrationQuestion({ nom_technique: 'connaissance_et_comprehension_1' }))
        .toEqual(CetC1);
    });

    it("Retourne une erreur si une question n'a pas d'illustration", function () {
      expect(() => {
        depot.illustrationQuestion({ id: 'id1', nom_technique: 'inconnu' });
      })
        .toThrow('La question id1 avec le nom technique "inconnu" ne possède pas d\'illustration');
    });

    it("Retourne une erreur si une question n'a pas de nom technique", function () {
      expect(() => {
        depot.illustrationQuestion({ id: 'id1' });
      })
        .toThrow('La question id1 avec le nom technique "undefined" ne possède pas d\'illustration');
    });
  });
});
