import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de la question', function () {
  let question;
  let store;
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    question = { choix: [] };
    store = creeStore();
    question.illustration = 'palette';
    wrapper = shallowMount(VueQuestion, {
      propsData: {
        question
      },
      store,
      localVue
    });
  });

  it("affiche l'image", function () {
    expect(wrapper.find('.question-illustration').exists()).toBe(true);
    expect(wrapper.find('.question-illustration').attributes('src')).toBe('palette');
  });
});
