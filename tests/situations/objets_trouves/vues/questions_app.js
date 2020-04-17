import { shallowMount, createLocalVue } from '@vue/test-utils';
import QuestionsApp from 'objets_trouves/vues/questions_app';
import EvenementReponse from 'questions/modeles/evenement_reponse';

describe("Les questions d'une app", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
  });

  it('affiche les questions les une après les autres', function () {
    const question1 = {};
    const question2 = {};
    const wrapper = shallowMount(QuestionsApp, {
      localVue,
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

  it.only('enregistre les réponses au journal', function (done) {
    localVue.prototype.$journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementReponse);
      expect(evenement.donnees()).to.eql({ question: 'mon-id', reponse: 'Ma super réponse', metacompetence: 'metacompetence' });
      done();
    };

    const question = { id: 'mon-id', metacompetence: 'metacompetence' };
    const wrapper = shallowMount(QuestionsApp, { localVue, propsData: { questions: [question] } });
    wrapper.vm.reponseApp('Ma super réponse');
  });
});
