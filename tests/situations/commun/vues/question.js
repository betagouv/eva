import { shallowMount } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';

describe('La vue de la question', function () {
  let question;

  beforeEach(function () {
    question = { choix: [] };
  });

  it("affiche l'image", function () {
    question.illustration = 'palette';
    const vue = shallowMount(VueQuestion, { propsData: { question } });

    expect(vue.contains('.question-illustration')).to.be(true);
    expect(vue.find('.question-illustration').attributes('src')).to.equal('palette');
  });
});
