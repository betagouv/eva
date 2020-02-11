import { shallowMount } from '@vue/test-utils';
import VueQuestion from 'questions/vues/question';
import { creeStore } from 'questions/modeles/store';

describe('La vue de la question', function () {
  let question;
  let store;

  beforeEach(function () {
    question = { choix: [] };
    store = creeStore();
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
  });
});
