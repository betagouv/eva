import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'cafe_de_la_place/modeles/store';
import Defi from 'commun/vues/defi';
import CafeDeLaPlace from 'cafe_de_la_place/vues/cafe_de_la_place';
import Pagination from 'commun/vues/components/pagination';

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

  describe('le chapitre ALrd', function () {
    it('Affiche une sous consigne', function (done) {
      expect(wrapper.findComponent(Defi).exists()).toBe(false);
      store.commit('configureActe', { chapitreALrd: { sousConsignes: [{ id: 'sous-consigne'}], questions: [{ id: 'question1' }]}
      });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findComponent(Defi).exists()).toBe(true);
        done();
      });
    });

    it('affiche les sous consignes et les questions les unes après les autres', function (done) {
      const sousConsigne = { id: 'sous-consigne', type: 'sous-consigne'};
      const sousConsigne2 = { id: 'sous-consigne-2', type: 'sous-consigne'};
      const question1 = { id: 'première', type: 'qcm' };
      const question2 = { id: 'seconde', type: 'qcm' };
      store.commit('configureActe', { chapitreALrd: {
          sousConsignes: [sousConsigne, sousConsigne2],
          questions: [question1, question2]
        }
      });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.carteActive).toEqual(sousConsigne);
        wrapper.vm.reponse();
        expect(wrapper.vm.carteActive).toEqual(sousConsigne2);
        wrapper.vm.reponse();
        expect(wrapper.vm.carteActive).toEqual(question1);
        wrapper.vm.reponse();
        expect(wrapper.vm.carteActive).toEqual(question2);
        expect(wrapper.emitted('terminer')).toBe(undefined);
        wrapper.vm.reponse();
        expect(wrapper.emitted('terminer').length).toEqual(1);
        expect(wrapper.vm.carteActive).toEqual(question2);
        done();
      });
    });
  
    it("n'affiche pas la pagination si la carte active est une sous consigne", function (done) {
      const sousConsigne = { id: 'sous-consigne', type: "sous-consigne"};
      const question = { id: 'première', type: 'qcm' };
      store.commit('configureActe', { chapitreALrd: { sousConsignes: [sousConsigne], questions: [question]} });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.carteActive).toEqual(sousConsigne);
        expect(wrapper.findComponent(Pagination).exists()).toBe(false);
        wrapper.vm.reponse();
        expect(wrapper.vm.carteActive).toEqual(question);
        wrapper.vm.$nextTick(() => {
          expect(wrapper.findComponent(Pagination).exists()).toBe(true);
          done();
        });
      });
    });
  });
});
