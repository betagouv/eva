import { shallowMount } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de la question', function () {
  let question;
  let store;

  beforeEach(function () {
    question = { choix: [] };
    store = creeStore();
  });

  function composant (question) {
    return shallowMount(VueQuestion, {
      props: { question },
      global: {
        plugins: [store]
      },
      mocks: {
        $traduction: traduction
      }
    });
  }

  describe("lorsque la question a une illustration", function () {
    beforeEach(function () {
      question.illustration = 'bienvenue_background.jpg';
    });

    it("affiche l'image", function () {
      const wrapper = composant(question);
      expect(wrapper.find('.question-illustration').exists()).toBe(true);
      expect(wrapper.find('.question-illustration').attributes('src')).toBe('bienvenue_background.jpg');
    });
  });

  describe("lorsque la question n'a pas d'illustration", function () {
    it("affiche la question sans image", function () {
      const wrapper = composant(question);
      expect(wrapper.find('.question-barre').exists()).toBe(true);
      expect(wrapper.find('.question-illustration').exists()).toBe(true);
      expect(wrapper.find('.question-illustration').attributes("src")).toBe(undefined);
    });
  });
});
