import { mount } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de la question', function () {
  let question;
  let store;
  let wrapper;

  describe("Quand la question n'a pas d'illustration", function () {
    beforeEach(function () {
      question = { choix: [] };
      store = creeStore();
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

    it("affiche l'illustration par defaut", function () {
      expect(wrapper.find('.question-illustration').exists()).toBe(true);
      expect(wrapper.find('.question-illustration').attributes('src')).toBe('chemin-illustration');
    });
  });

  describe("Quand la question a une illustration", function () {
    beforeEach(function () {
      question = { choix: [] };
      question.illustration = 'bienvenue_background.jpg';
      store = creeStore();
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

    it("affiche l'illustration d'une question si elle en a une", function () {
      expect(wrapper.find('.question-illustration').exists()).toBe(true);
      expect(wrapper.find('.question-illustration').attributes('src')).toBe('bienvenue_background.jpg');
    });
  });
});
