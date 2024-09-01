import puzzle from 'place_du_marche/vues/components/puzzle_billets.vue';
import { config, mount } from '@vue/test-utils';

describe('Le composant Puzzle Billets', function () {
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
});
