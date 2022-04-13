import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'cafe_de_la_place/modeles/store';

describe('Le composant Trou A completer', function () {
  let wrapper;
  let localVue;
  let store;
  const premiereQuestion = { id: 'aplc1'};
  const question1 = 'aplc1';
  const question2 = 'aplc2';

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', {
      series: [
        { cartes: [premiereQuestion] }
      ]
    });
    localVue = createLocalVue();
  });

  describe('#trouEnCours', function () {
    it("ajoute la classe reponse--en-cours quand il s'agit de la réponse à compléter", function () {
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { idQuestion: question1 } });
      const trou = wrapper.find('span');
      expect(trou.classes('reponse--en-cours')).toBe(true);
    });

    it("ne rajoute pas la classe reponse--en-cours quand il ne s'agit pas de la réponse à completer", function () {
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { idQuestion: question2 } });
      const trou = wrapper.find('span');
      expect(trou.classes('reponse--en-cours')).toBe(false);
    });
  });

  describe("quand il n'y a pas de réponse", function () {
    beforeEach(function () {
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { idQuestion: question1 } });
    });

    it("affiche par défaut le contenu de remplissage", function () {
      expect(wrapper.find('span').text()).toContain('______');
    });

    it("ajoute la classe 'reponse--en-attente'", function () {
      const trou = wrapper.find('span');
      expect(wrapper.vm.reponseEnAttente).toBe(true);
      expect(trou.classes('reponse--en-attente')).toBe(true);
      expect(trou.classes('reponse--completee')).toBe(false);
    });
  });

  describe("quand il y a une réponse", function () {
    beforeEach(function () {
      store.state.reponses = { aplc1: { question: 'aplc1', reponse: 'saladiers' }};
      wrapper = shallowMount(TrouACompleter, { localVue, store, propsData: { idQuestion: question1 } });
    });

    it("affiche le contenu de la valeur", function () {
      expect(wrapper.find('span').text()).toContain('saladiers');
    });

    it("ajoute la classe 'reponse--completee'", function () {
      const trou = wrapper.find('span');
      expect(wrapper.vm.reponseEnAttente).toBe(false);
      expect(trou.classes('reponse--en-attente')).toBe(false);
      expect(trou.classes('reponse--completee')).toBe(true);
    });
  });
});
