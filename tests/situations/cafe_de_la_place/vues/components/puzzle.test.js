import puzzle from 'cafe_de_la_place/vues/components/puzzle.vue';
import { config, mount } from '@vue/test-utils';

describe('Le composant Puzzle', function () {
  let wrapper;
  const bonOrdre = [0, 1, 2, 3, 4, 5, 6];

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  function genereVue(fragmentsNonClasses) {
    wrapper = mount(puzzle, {
      global: {
        mocks: {
          $traduction: () => {}
        }
      },
      props: {
        question: {
          fragmentsNonClasses
        }
      }
    });
  }

  it("affiche le puzzle de gauche", function () {
    genereVue([]);
    expect(wrapper.find('.puzzle-gauche').exists()).toBe(true);
  });

  describe("les composants draggable envoie une réponse à chaque fois qu'on pose un fragement", function() {
    it("le puzzle de gauche emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.puzzle-gauche').vm.$emit('end');
      expect(wrapper.emitted('reponse').length).toEqual(1);
    });

    it("le puzzle de droite emet ses réponses", function() {
      genereVue([1, 2]);
      wrapper.findComponent('.puzzle-droite').vm.$emit('end');
      expect(wrapper.emitted('reponse').length).toEqual(1);
    });
  });

  describe("quand on a pas encore envoyé un ensemble de reponse complet", function () {
    beforeEach(function () {
      genereVue([2, 1]);
      wrapper.vm.fragmentsClasses.push({ id: 1 });
      wrapper.vm.envoiReponse();
    });

    it("affiche le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(true);
      expect(wrapper.find('.puzzle-droite').exists()).toBe(true);
    });

    it("affiche la zone de dépot", function () {
      const zoneDeDepot = wrapper.find('.zone-de-depot');
      expect(zoneDeDepot.exists()).toBe(true);
    });
  });

  describe("quand on a envoyé un ensemble de réponse complet", function () {
    beforeEach(function () {
      genereVue([2, 1]);
      wrapper.vm.fragmentsClasses.push({ position: 1 });
      wrapper.vm.fragmentsClasses.push({ position: 2 });
      wrapper.vm.envoiReponse();
    });

    it("n'affiche plus le puzzle à droite", function () {
      expect(wrapper.vm.affichePuzzleDroite).toEqual(false);
      expect(wrapper.find('.puzzle-droite').exists()).toBe(false);
    });

    it("n'affiche plus la zone de dépot", function () {
      expect(wrapper.find('.zone-de-depot').exists()).toBe(false);
    });
  });

  describe("envoie la réponse au serveur", function() {
    it('envoie le score, le sucess et la réponse', function () {
      genereVue([1, 0, 2, 3, 4, 5, 6]);
      for(const position of bonOrdre) {
        wrapper.vm.fragmentsClasses.push({ position });
      }
      wrapper.vm.envoiReponse();
      expect(wrapper.emitted('reponse').length).toEqual(1);
      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        score: 8,
        scoreMax: 8,
        succes: true,
        reponse: bonOrdre
      });
    });

    describe("#score", function() {
      beforeEach(function() {
        genereVue([1, 2, 3, 4, 5, 6, 0]);
      });

      it('avec aucun fragment à la bonne place', function() {
        expect(wrapper.vm.calculeScore([1, 2, 3, 4, 5, 6, 0])).toEqual(0);
      });

      it('avec 1 fragment à la bonne place', function() {
        expect(wrapper.vm.calculeScore([0, 2, 3, 4, 5, 6, 1])).toEqual(1);
      });

      it('avec 5 fragments à la bonne place', function() {
        expect(wrapper.vm.calculeScore([0, 1, 2, 3, 4, 6, 5])).toEqual(6);
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
