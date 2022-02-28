import { shallowMount } from '@vue/test-utils';

import ClicSurMots from 'cafe_de_la_place/vues/components/clic_sur_mots.vue';

describe('Le composant Clic Sur Mots', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(ClicSurMots);
  });

  describe('#selectionneMot', function () {
    it('ajoute la classe mot--selectionne au mot sur lequel on clique', function (done) {
      expect(wrapper.findAll('.mot.mot--selectionne').length).toBe(0);
      wrapper.vm.selectionneMot();
      expect(wrapper.vm.estSelectionne).toBe(true);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('.mot.mot--selectionne').length).toBe(1);
        done();
      });
    });
  });
});
