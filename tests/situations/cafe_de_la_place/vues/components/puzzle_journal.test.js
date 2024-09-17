import puzzle from 'cafe_de_la_place/vues/components/puzzle_journal.vue';
import { config, mount } from '@vue/test-utils';

describe('Le composant Puzzle Journal', function () {
  let wrapper;
  const bonOrdre = [1, 2, 3, 4, 5, 6, 7];

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  function genereVue(reponsesNonClassees) {
    wrapper = mount(puzzle, {
      global: {
        mocks: {
          $traduction: () => {}
        }
      },
      props: {
        question: {
          reponsesNonClassees
        }
      }
    });
  }

  it("affiche le composant glisser déposer", function () {
    genereVue([]);
    expect(wrapper.find('.glisser-deposer').exists()).toBe(true);
  });

  it('envoi la réponse au serveur', function () {
    genereVue(bonOrdre);
    wrapper.vm.envoiReponse( { score: 8, scoreMax: 8, succes: true, reponse: bonOrdre });
    expect(wrapper.emitted('reponse').length).toEqual(1);
    expect(wrapper.emitted('reponse')[0][0]).toEqual({
      score: 8,
      scoreMax: 8,
      succes: true,
      reponse: bonOrdre
    });
  });

  describe("#calculeScore", function() {
    beforeEach(function() {
      genereVue([1, 2, 3, 4, 5, 6, 0]);
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
});
