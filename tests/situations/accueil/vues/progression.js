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
      progression (identifiant) {
        return { src: identifiant };
      }
    }();
    localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    store = new Vuex.Store({
      state: {
        niveau: 2
      },
      getters: {
        niveauActuel (state) {
          return state.niveau;
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
    expect(wrapper.vm.backgroundImage).to.eql("url('1')");
    store.state.niveau = 42;
    expect(wrapper.vm.backgroundImage).to.eql("url('42')");
  });
});
