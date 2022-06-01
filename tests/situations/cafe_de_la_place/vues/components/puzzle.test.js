import puzzle from 'cafe_de_la_place/vues/components/puzzle.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

describe('Le composant Puzzle', function () {
  let wrapper;
  let localVue;
  let store;

  function composant() {
    return shallowMount(puzzle, {
      localVue,
      store
    });
  }

  function genereVue(nouvelles) {
    store = new Vuex.Store({ getters: { nouvellesDuJourNonClassees () { return nouvelles; }}});
    localVue = createLocalVue();
    wrapper = composant({});
  }

  describe("quand il n'y a plus de nouvelles à classer", function () {
    beforeEach(function () {
      const nouvellesDuJourNonClassees = [];
      genereVue(nouvellesDuJourNonClassees);
    });

    it("n'affiche plus le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(false);
      expect(wrapper.findComponent('.puzzle-droite').exists()).toBe(false);
    });
  });

  describe("quand il y a des nouvelles à classer", function () {
    beforeEach(function () {
      const nouvellesDuJourNonClassees = [{ id: 'nouvelle_1', contenu: 'Ma super nouvelle !' }];
      genereVue(nouvellesDuJourNonClassees);
    });

    it("affiche le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(true);
      expect(wrapper.findComponent('.puzzle-droite').exists()).toBe(true);
    });
  });
});
