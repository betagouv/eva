import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Progression from 'accueil/vues/progression';

describe('La vue pour afficher la progression', function () {
  let depotRessources;
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    depotRessources = new class {
      progression (identifiant, dernierNiveau) {
        return { src: identifiant + '-' + dernierNiveau };
      }
    }();
    localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    store = new Vuex.Store({
      state: {
        niveau: 2,
        dernierNiveau: 5
      },
      getters: {
        niveauActuel (state) {
          return state.niveau;
        },
        dernierNiveau (state) {
          return state.dernierNiveau;
        }
      }
    });
    wrapper = mount(Progression, {
      localVue,
      store
    });
  });

  it("rend l'image de fond en fonction du niveau actuel", function () {
    store.state.niveau = 1;
    store.state.dernierNiveau = 5;
    expect(wrapper.vm.backgroundImage).to.eql("url('1-5')");
    store.state.niveau = 42;
    expect(wrapper.vm.backgroundImage).to.eql("url('42-5')");
    store.state.dernierNiveau = 43;
    expect(wrapper.vm.backgroundImage).to.eql("url('42-43')");
  });
});
