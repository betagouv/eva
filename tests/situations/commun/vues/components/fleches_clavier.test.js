import { shallowMount } from '@vue/test-utils';

import FlechesClavier from 'commun/vues/components/fleches_clavier';
import Touche from 'commun/vues/components/touche';
import Keypress from 'vue-keypress';

describe('La vue flèches clavier', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(FlechesClavier);
  });

  it('affiche les composants une fois chargé', function () {
    expect(wrapper.findComponent(Touche).exists()).toBe(true);
    expect(wrapper.findComponent(Keypress).exists()).toBe(true);
  });

  it('rajoute la classe action-fleches--animation sur la touche de gauche pour le choix gauche', function (done) {
    expect(wrapper.find('.touche-gauche').classes('actions-fleches--animation')).toBe(false);
    wrapper.vm.choixFait = wrapper.vm.choixGauche;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.touche-gauche').classes('actions-fleches--animation')).toBe(true);
      done();
    });
  });

  it('rajoute la classe action-fleches--animation sur la touche de droite pour le choix droit', function (done) {
    expect(wrapper.find('.touche-droite').classes('actions-fleches--animation')).toBe(false);
    wrapper.vm.choixFait = wrapper.vm.choixDroit;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.touche-droite').classes('actions-fleches--animation')).toBe(true);
      done();
    });
  });

  describe('#selectionne(reponse)', function () {
    it("émet l'évènement actionGauche", function () {
      wrapper.vm.selectionne('gauche');
      expect(wrapper.emitted()).toHaveProperty('actionGauche');
    });
  });
});
