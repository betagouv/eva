import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'plan_de_la_ville/modeles/store';
import Qcm from 'commun/vues/qcm';
import PlanDeLaVille from 'plan_de_la_ville/vues/plan_de_la_ville';

describe('La vue plan de la ville', function () {
  let wrapper;
  let store;
  let localVue;
  let depotRessources;

  beforeEach(function () {
    store = creeStore();
    depotRessources = new class {
      fondSituation () {
        return { src: 'fond-situation.png' };
      }
    }();
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(PlanDeLaVille, { localVue, store });
    localVue.prototype.$depotRessources = depotRessources;
  });

  it('Affiche une question', function (done) {
    expect(wrapper.findComponent(Qcm).exists()).toBe(false);
    store.commit('configureActe', { questions: [{ id: 'ma-question' }] });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent(Qcm).exists()).toBe(true);
      done();
    });
  });

  it("affiche l'image de fond de la situation", function (done) {
    store.commit('configureActe', { questions: [{ id: 'ma-question' }], fondSituation: 'fond-situation.png' });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.fond-situation').attributes('style')).toEqual('background-image: url(fond-situation.png);');
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
