import { shallowMount } from '@vue/test-utils';
import QuestionsApp from 'objets_trouves/vues/questions_app';

describe("Les questions d'une app", function () {
  it('affiche les questions les une après les autres', function () {
    const question1 = {};
    const question2 = {};
    const wrapper = shallowMount(QuestionsApp, {
      propsData: {
        questions: [question1, question2]
      }
    });
    expect(wrapper.vm.question).to.eql(question1);
    wrapper.vm.reponseApp();
    expect(wrapper.vm.question).to.eql(question2);
    expect(wrapper.emitted('finQuestions')).to.be(undefined);
    wrapper.vm.reponseApp();
    expect(wrapper.emitted('finQuestions').length).to.eql(1);
    expect(wrapper.vm.question).to.eql(question2);
  });
});
