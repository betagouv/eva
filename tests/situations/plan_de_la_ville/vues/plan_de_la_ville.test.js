import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'plan_de_la_ville/modeles/store';
import Defi from 'commun/vues/defi';
import PlanDeLaVille from 'plan_de_la_ville/vues/plan_de_la_ville';

describe('La vue plan de la ville', function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(PlanDeLaVille, {
      global: {
        plugins: [store],
        mocks: {
          $journal:  { enregistre () {} }
        },
        stubs: {
          TransitionFade: false
        }
      }
    });
  });

  it('Affiche une question', function (done) {
    expect(wrapper.findComponent(Defi).exists()).toBe(false);
    store.commit('configureActe', { questions: [{ id: 'ma-question' }] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(Defi).exists()).toBe(true);
      done();
    });
  });

  it('affiche les questions les unes après les autres', function () {
    const question1 = { id: 'première' };
    const question2 = { id: 'secondes' };
    store.commit('configureActe', { questions: [question1, question2] });
    expect(wrapper.vm.questionActive).toEqual(question1);
    wrapper.vm.reponseQuestion();
    expect(wrapper.vm.questionActive).toEqual(question2);
    expect(wrapper.emitted('terminer')).toBe(undefined);
    wrapper.vm.reponseQuestion();
    expect(wrapper.emitted('terminer').length).toEqual(1);
    expect(wrapper.vm.questionActive).toEqual(question2);
  });
});
