import { shallowMount, createLocalVue } from '@vue/test-utils';
import Acte from 'maintenance/vues/acte';
import Lexique from 'maintenance/vues/lexique';
import { creeStore, DEMARRE } from 'maintenance/modeles/store';

describe("La vue de l'acte", function () {
  let wrapper;
  let localVue;
  let store;

  beforeEach(function () {
    localVue = createLocalVue();
    store = creeStore();
    wrapper = shallowMount(Acte, {
      store,
      localVue
    });
  });

  it("A l'initialisation de l'acte la situation n'est pas démarré", function () {
    expect(wrapper.vm.situationDemarre).to.eql(false);
    expect(wrapper.contains(Lexique)).to.be(false);
    store.commit('configureActe', { lexique: [] });
    store.commit('modifieEtat', DEMARRE);
    expect(wrapper.vm.situationDemarre).to.eql(true);
    expect(wrapper.contains(Lexique)).to.be(true);
  });
});
