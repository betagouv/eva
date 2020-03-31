import chargeurs from '../../commun/aides/mock_chargeurs';
import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.wav';

describe('Le dépot ressource de la situation Objects trouvés', function () {
  let depot;

  beforeEach(function () {
    depot = new DepotRessourcesObjetsTrouves(chargeurs());
    return depot.chargement();
  });

  it("Retourne la réponse d'audio d'un QCM", function () {
    expect(depot.reponseAudio('agenda', 1)).to.equal(sonChoix1);
    expect(depot.reponseAudio('questionnaire inconnu', 1)).to.be(undefined);
  });
});
