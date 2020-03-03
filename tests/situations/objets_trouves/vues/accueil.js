import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import MockDepotRessources from '../aides/mock_depot_ressources_objets_trouves';
import Accueil from 'objets_trouves/vues/accueil';

describe("La vue de l'accueil", function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    localVue.prototype.$traduction = traduction;
    wrapper = shallowMount(Accueil, {
      localVue
    });
  });

  it('affiche le fond', function () {
    expect(wrapper.attributes('style')).to.equal('background-image: url(fond);');
  });

  it('affiche les icones', function () {
    expect(wrapper.findAll('.icone').length).to.eql(5);
  });
});
