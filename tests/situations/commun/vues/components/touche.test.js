import { shallowMount } from '@vue/test-utils';
import Touche from 'commun/vues/components/touche';

describe('Le composant touche', function () {
  let wrapper;

  it('affiche un label à droite', function () {
    wrapper = shallowMount(Touche, {
      props: { label: 'texte' }
    });
    expect(wrapper.find('.label-droite').exists()).toEqual(true);
    expect(wrapper.find('.label-gauche').exists()).toEqual(false);
  });

  it('affiche un label à gauche', function () {
    wrapper = shallowMount(Touche, {
      props: { labelGauche: 'texte' }
    });
    expect(wrapper.find('.label-droite').exists()).toEqual(false);
    expect(wrapper.find('.label-gauche').exists()).toEqual(true);
  });

  it("n'affiche aucun label", function () {
    wrapper = shallowMount(Touche);
    expect(wrapper.find('.label-droite').exists()).toEqual(false);
    expect(wrapper.find('.label-gauche').exists()).toEqual(false);
  });

  it('fait tourner le svg', function () {
    wrapper = shallowMount(Touche, {
      props: { rotation: 90 }
    });
    expect(wrapper.find('rect').attributes('transform')).toEqual('rotate(90,14,14)');
    expect(wrapper.find('path').attributes('transform')).toEqual('rotate(90,14,14)');
  });

  it('peut changer de couleur', function () {
    wrapper = shallowMount(Touche, {
      props: { couleur: 'verte' }
    });
    expect(wrapper.find('.touche.verte').exists()).toEqual(true);
  });
});
