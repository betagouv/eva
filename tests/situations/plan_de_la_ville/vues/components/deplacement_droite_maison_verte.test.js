import { shallowMount } from '@vue/test-utils';

import DeplacementDroite from 'plan_de_la_ville/vues/components/deplacement_droite_maison_verte.vue';
import Keypress from 'vue-keypress';

describe('La vue Déplacement droite maison verte', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(DeplacementDroite);
  });

  it('affiche les composants une fois chargé', function () {
    expect(wrapper.findComponent(Keypress).exists()).toBe(true);
  });

  describe('#deplacementValide', function () {
    it("emet l'évènement 'action'", function () {
      wrapper.vm.deplacementValide();
      expect(wrapper.emitted()).toHaveProperty('action');
    });

    it("n'emet pas l'évènement 'action' quand la question est terminée", function () {
      wrapper.setData({ termine: true });

      wrapper.vm.deplacementValide();
      expect(wrapper.emitted()).not.toHaveProperty('action');
    });
  });
});
