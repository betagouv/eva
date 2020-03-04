import { shallowMount } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'commun/modeles/store';

describe('La vue de la question', function () {
  let question;
  let store;

  beforeEach(function () {
    question = { choix: [] };
    store = creeStore({
      getters: {
        numeroQuestionCourante () { return 1; },
        nombreQuestions () { return 2; }
      }
    });
  });

  it("affiche l'image", function () {
    question.illustration = 'palette';
    const vue = shallowMount(VueQuestion, { store, propsData: { question } });

    expect(vue.contains('.question-illustration')).to.be(true);
    expect(vue.find('.question-illustration').attributes('src')).to.equal('palette');
  });

  it('affiche la progression', function () {
    const vue = shallowMount(VueQuestion, { store, propsData: { question } });
    expect(vue.contains('.question-progression')).to.be(true);
    expect(vue.text()).to.eql('1/2');
  });
});
