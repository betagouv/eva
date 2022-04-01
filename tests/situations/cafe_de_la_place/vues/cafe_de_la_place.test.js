import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'cafe_de_la_place/modeles/store';
import Defi from 'commun/vues/defi';
import CafeDeLaPlace from 'cafe_de_la_place/vues/cafe_de_la_place';
import Pagination from 'commun/vues/components/pagination';

describe('La vue café de la place', function () {
  let wrapper;
  let store;
  let localVue;
  const sousConsigne = { id: 'sous-consigne', type: 'sous-consigne' };
  const question = { id: 'question1' };

  beforeEach(function () {
    store = creeStore();
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    wrapper = shallowMount(CafeDeLaPlace, { localVue, store });
  });

  describe("quand elle n'est pas configurée", function () {
    it("n'affiche pas de défi", function () {
      expect(wrapper.findComponent(Defi).exists()).toBe(false);
    });
  });

  describe('quand elle est configurée', function () {
    beforeEach(function() {
      store.commit('configureActe', {
        series: [
          { cartes: [sousConsigne] },
          { cartes: [question] }
        ]
      });
    });

    it('Affiche un défi', function () {
      expect(wrapper.findComponent(Defi).exists()).toBe(true);
    });

    it("n'affiche pas la pagination si la carte active est une sous consigne", function (done) {
      store.state.carteActive = sousConsigne;
      expect(wrapper.vm.affichePagination).toBe(false);
      expect(wrapper.findComponent(Pagination).exists()).toBe(false);

      store.state.carteActive = question;
      expect(wrapper.vm.affichePagination).toBe(true);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.nombreCartes).toBe(1);
        expect(wrapper.findComponent(Pagination).exists()).toBe(true);
        done();
      });
    });

    it("emet 'terminer' quand c'est terminé", function (done) {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().terminer).not.toBeDefined();
        store.state.termine = true;
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().terminer).toBeTruthy();
          done();
        });
      });
    });
  });
});
