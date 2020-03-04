import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';
import MockDepotRessources from '../aides/mock_depot_ressources_objets_trouves';
import { creeStore } from 'objets_trouves/modeles/store';
import Accueil from 'objets_trouves/vues/accueil';
import IconeApp from 'objets_trouves/vues/icone_app';

describe("La vue de l'accueil", function () {
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    localVue.prototype.$traduction = traduction;
    store = creeStore();
    wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
  });

  it('affiche le fond', function () {
    expect(wrapper.attributes('style')).to.equal('background-image: url(fond);');
  });

  it('affiche les icones', function () {
    expect(wrapper.findAll(IconeApp).length).to.eql(5);
  });

  it("affiche l'appli clické", function (done) {
    store.commit = (mutation, args) => {
      expect(mutation).to.eql('afficheAppli');
      expect(args).to.eql('photos');
      done();
    };
    wrapper.vm.afficheAppli('photos');
  });
});
