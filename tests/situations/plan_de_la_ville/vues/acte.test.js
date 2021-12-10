import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'plan_de_la_ville/modeles/store';
import Qcm from 'commun/vues/qcm';
import Acte from 'plan_de_la_ville/vues/acte';

describe("La vue de l'acte plan de la ville", function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(Acte, { localVue, store });
  });

  it('Affiche une question', function (done) {
    expect(wrapper.findComponent(Qcm).exists()).toBe(false);
    store.commit('configureActe', { questions: [{ id: 'ma-question' }] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(Qcm).exists()).toBe(true);
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
