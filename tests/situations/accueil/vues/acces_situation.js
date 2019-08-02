import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AccesSituation from 'accueil/vues/acces_situation.vue';

describe('La vue pour accéder à une situation', function () {
  let depotRessources;
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    depotRessources = new class {
      batimentSituation (identifiant) {
        return { src: identifiant };
      }
    }();
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
    wrapper = mount(AccesSituation, {
      localVue,
      store,
      propsData: {
        situation: {
          nom: 'ABC',
          chemin: 'abc.html',
          identifiant: 'identifiant-abc',
          niveauMinimum: 2
        }
      }
    });
  });

  it("sait s'afficher", function () {
    expect(wrapper.text()).to.eql('ABC');
    expect(wrapper.attributes('href')).to.equal('abc.html');
    expect(wrapper.classes('identifiant-abc')).to.be(true);
    expect(wrapper.attributes('style')).to.equal('background-image: url(identifiant-abc);');
  });

  it("sait s'afficher en étant désactivé", function () {
    expect(wrapper.vm.desactivee).to.be(false);
    store.state.niveau = 1;
    expect(wrapper.vm.desactivee).to.be(true);
  });
});
