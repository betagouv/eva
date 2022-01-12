import { shallowMount } from '@vue/test-utils';

import DeplacementDroite from 'plan_de_la_ville/vues/components/deplacement_droite_maison_verte.vue';
import FlechesClavier from 'commun/vues/components/fleches_clavier';

describe('La vue Déplacement droite maison verte', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(DeplacementDroite);
  });

  describe('#deplacementValide', function () {
    it("émet l'évènement 'action'", function () {
      wrapper.vm.deplacementValide();
      expect(wrapper.emitted()).toHaveProperty('action');
    });
  });

  describe('sur ordinateur', function () {
    it('affiche les touches flèches du clavier', function () {
      expect(wrapper.findComponent(FlechesClavier).exists()).toBe(true);
    });
  });

  describe('sur ordinateur', function () {
    it('affiche les touches flèches du clavier', function () {
      expect(wrapper.findComponent(FlechesClavier).exists()).toBe(true);
    });
  });
});
