import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

describe('Le composant Trou A completer', function () {
  let wrapper;
  let localVue;
  let store;
  const premiereQuestion = { id: 'aplc1'};
  const reponse1 = 'aplc1';
  const reponse2 = 'aplc2';

  beforeEach(function () {
    store = new Vuex.Store({ state: { carteActive: premiereQuestion }});
    localVue = createLocalVue();
  });

  describe('#selectionneTrou', function () {
    it("ajoute la classe reponse--a-completer quand il s'agit de la réponse à compléter", function () {
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { id: reponse1 } });
      const trou = wrapper.find('span');
      expect(trou.classes('reponse--a-completer')).toBe(true);
    });

    it("ne rajoute pas la classe reponse--a-completer quand il ne s'agit pas de la réponse à completer", function () {
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { id: reponse2 } });
      const trou = wrapper.find('span');
      expect(trou.classes('reponse--a-completer')).toBe(false);
    });
  });
});
