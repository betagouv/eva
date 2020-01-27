import { shallowMount, createLocalVue } from '@vue/test-utils';
import Acte from 'maintenance/vues/acte';
import { creeStore } from 'securite/modeles/store';

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
    expect(wrapper.vm.situationDemarre()).to.eql(false);
  });
});
