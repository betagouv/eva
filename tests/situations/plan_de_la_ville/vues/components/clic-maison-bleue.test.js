import { shallowMount } from '@vue/test-utils';

import ClicMaisonBleue from 'plan_de_la_ville/vues/components/clic-maison-bleue.vue';

describe('Clic de la maison bleue', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(ClicMaisonBleue);
  });

  describe('#clicValide', function () {
    it("émet l'évènement 'action'", function () {
      wrapper.vm.clicValide();
      expect(wrapper.emitted()).toHaveProperty('action');
    });
  });
});
