import { mount } from '@vue/test-utils';
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
    const depotRessources = {
      illustrationQuestion: () => {
        return { src: 'chemin-illustration' };
      }
    };
    wrapper = mount(VueQuestion, {
      shallow: true,
      props: { question },
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources,
          $traduction: traduction
        }
      },
    });
  });

  it("affiche l'image", function () {
    expect(wrapper.find('.question-illustration').exists()).toBe(true);
    expect(wrapper.find('.question-illustration').attributes('src')).toBe('chemin-illustration');
  });
});
