import puzzle from 'cafe_de_la_place/vues/components/puzzle.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

describe('Le composant Puzzle', function () {
  let wrapper;
  let localVue;
  let store;

  function genereVue(nouvelles) {
    store = new Vuex.Store({ getters: { nouvellesDuJourNonClassees () { return nouvelles; }}});
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    wrapper = shallowMount(puzzle, {
      localVue,
      store
    });
  }

  it("affiche le puzzle de gauche", function () {
    genereVue([]);
    expect(wrapper.findComponent('.puzzle-gauche').exists()).toBe(true);
  });

  describe("Évite que le premier ghost n'apparaisse en dessous du footer", function () {
    beforeEach(function () {
      const nouvellesDuJourNonClassees = [{ id: 'nouvelle_1', contenu: 'Ma super nouvelle !' }];
      genereVue(nouvellesDuJourNonClassees);
    });

    it("affiche un puzzle-item invisible au démarrage", function () {
      expect(wrapper.findComponent('.puzzle-item.invisible').exists()).toBe(true);
    });

    it("n'affiche plus le puzzle-item invisible après avoir classé une première nouvelle", function (done) {
      wrapper.vm.nouvellesDuJourClassees.push({ id: 'nouvelle_1', contenu: 'Ma super nouvelle !' });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findComponent('.puzzle-item.entete-invisible').exists()).toBe(false);
        done();
      });
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

    it("affiche la zone de dépot", function () {
      const zoneDeDepot = wrapper.find('.zone-de-depot');
      expect(zoneDeDepot.exists()).toBe(true);
    });
  });

  describe("quand il n'y a plus de nouvelles à classer", function () {
    beforeEach(function () {
      const nouvellesDuJourNonClassees = [];
      genereVue(nouvellesDuJourNonClassees);
    });

    it("n'affiche plus le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(false);
      expect(wrapper.findComponent('.puzzle-droite').exists()).toBe(false);
    });

    it("n'affiche plus la zone de dépot", function () {
      expect(wrapper.find('.zone-de-depot').exists()).toBe(false);
    });
  });
});
