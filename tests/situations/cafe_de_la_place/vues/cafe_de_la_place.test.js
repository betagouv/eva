import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'cafe_de_la_place/modeles/store';
import Defi from 'commun/vues/defi';
import CafeDeLaPlace from 'cafe_de_la_place/vues/cafe_de_la_place';

describe('La vue café de la place', function () {
  let wrapper;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(CafeDeLaPlace, { localVue, store });
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
    const question2 = { id: 'seconde' };
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
