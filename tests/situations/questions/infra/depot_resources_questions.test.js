import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';
import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

describe('Le dépot ressource de la situation Question', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesQuestions(chargeurs());
  });

  it('étend DépotRessourcesCommune', function () {
    expect(depot).toBeInstanceOf(DepotRessourcesCommunes);
  });
});
