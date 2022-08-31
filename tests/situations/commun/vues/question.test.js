import { shallowMount } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de la question', function () {
  let question;
  let store;
  let wrapper;

  beforeEach(function () {
    question = { choix: [] };
    store = creeStore();
    question.illustration = 'bienvenue_background.jpg';
    wrapper = shallowMount(VueQuestion, {
      props: { question },
      global: {
        plugins: [store]
      },
      mocks: {
        $traduction: traduction
      }
    });
  });

  it("affiche l'image", function () {
    expect(wrapper.find('.question-illustration').exists()).toBe(true);
    expect(wrapper.find('.question-illustration').attributes('src')).toBe('bienvenue_background.jpg');
  });
});
