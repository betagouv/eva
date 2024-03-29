import { shallowMount } from '@vue/test-utils';
import QuestionsApp from 'objets_trouves/vues/questions_app';
import EvenementReponse from 'questions/modeles/evenement_reponse';

describe("Les questions d'une app", function () {
  let journal;

  beforeEach(function () {
    journal = { enregistre () {} };
  });

  it('affiche les questions les une après les autres', function () {
    const question1 = {};
    const question2 = {};
    const wrapper = shallowMount(QuestionsApp, {
      global: {
        mocks: {
          $journal: journal
        }
      },
      props: {
        questions: [question1, question2]
      }
    });
    expect(wrapper.vm.question).toEqual(question1);
    wrapper.vm.reponseApp();
    expect(wrapper.vm.question).toEqual(question2);
    expect(wrapper.emitted('finQuestions')).toBe(undefined);
    wrapper.vm.reponseApp();
    expect(wrapper.emitted('finQuestions').length).toEqual(1);
    expect(wrapper.vm.question).toEqual(question2);
  });

  it('enregistre les réponses au journal', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementReponse);
      expect(evenement.donnees()).toEqual({ reponse: 'Ma super réponse' });
      done();
    };

    const question = { id: 'mon-id', metacompetence: 'metacompetence' };
    const wrapper = shallowMount(QuestionsApp, {
      global: {
        mocks: {
          $journal: journal
        }
      },
      props: { questions: [question] }
    });
    wrapper.vm.reponseApp({ reponse: 'Ma super réponse' });
  });
});
