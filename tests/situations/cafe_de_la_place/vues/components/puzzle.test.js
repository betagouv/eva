import puzzle from 'cafe_de_la_place/vues/components/puzzle.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';

describe('Le composant Puzzle', function () {
  let wrapper;
  let localVue;
  const bonOrdre = [1, 2, 3, 4, 5, 6, 7];

  function genereVue(fragmentsNonClasses, bonOrdre) {
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    wrapper = shallowMount(puzzle, {
      localVue,
      propsData: {
        question: {
          fragmentsNonClasses: fragmentsNonClasses,
          reponse: { bonOrdre }
        }
      }
    });
  }

  it("affiche le puzzle de gauche", function () {
    genereVue([]);
    expect(wrapper.findComponent('.puzzle-gauche').exists()).toBe(true);
  });

  describe("Évite que le premier ghost n'apparaisse en dessous du footer", function () {
    beforeEach(function () {
      genereVue([]);
    });

    it("affiche un puzzle-item invisible au démarrage", function () {
      expect(wrapper.findComponent('.puzzle-item.invisible').exists()).toBe(true);
    });

    it("n'affiche plus le puzzle-item invisible après avoir classé une première nouvelle", function (done) {
      wrapper.vm.fragmentsClasses.push({ id: 'nouvelle_1', contenu: 'Ma super nouvelle !' });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findComponent('.puzzle-item.entete-invisible').exists()).toBe(false);
        done();
      });
    });
  });

  describe("quand on a pas encore envoyé un ensemble de reponse complet", function () {
    beforeEach(function () {
      genereVue([], [1, 2]);
      wrapper.vm.fragmentsClasses.push({ id: 1 });
      wrapper.vm.envoiReponse();
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

  describe("quand on a envoyé un ensemble de réponse complet", function () {
    beforeEach(function () {
      genereVue([], [1, 2]);
      wrapper.vm.fragmentsClasses.push({ id: 1 });
      wrapper.vm.fragmentsClasses.push({ id: 2 });
      wrapper.vm.envoiReponse();
    });

    it("n'affiche plus le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(false);
      expect(wrapper.findComponent('.puzzle-droite').exists()).toBe(false);
    });

    it("n'affiche plus la zone de dépot", function () {
      expect(wrapper.find('.zone-de-depot').exists()).toBe(false);
    });
  });

  describe("envoie la réponse au serveur", function() {
    it('envoie le score, le sucess et la réponse', function () {
      genereVue([], bonOrdre);
      for(const id of bonOrdre) {
        wrapper.vm.fragmentsClasses.push({ id });
      }
      wrapper.vm.envoiReponse();
      expect(wrapper.emitted('reponse').length).toEqual(1);
      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        score: 8,
        succes: true,
        reponse: bonOrdre
      });
    });

    describe("#score", function() {
      beforeEach(function() {
        genereVue([], bonOrdre);
      });

      it('avec aucun fragment à la bonne place', function() {
        expect(wrapper.vm.calculeScore([2, 3, 4, 5, 6, 7, 1])).toEqual(0);
      });

      it('avec 1 fragment à la bonne place', function() {
        expect(wrapper.vm.calculeScore([1, 3, 4, 5, 6, 7, 2])).toEqual(1);
      });

      it('avec 5 fragments à la bonne place', function() {
        expect(wrapper.vm.calculeScore([1, 2, 3, 4, 5, 7, 6])).toEqual(6);
      });

      it('avec tout bien placé', function() {
        expect(wrapper.vm.calculeScore(bonOrdre)).toEqual(8);
      });
    });

    describe('#succes', function() {
      it("quand tout est à la bonne place", function() {
        expect(wrapper.vm.succes(bonOrdre)).toBe(true);
      });

      it("quand ce n'est pas le bon ordre", function() {
        expect(wrapper.vm.succes([1, 2, 3, 4, 5, 7, 6])).toBe(false);
      });
    });
  });
});
