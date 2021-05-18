import { shallowMount, createLocalVue } from '@vue/test-utils';
import Touche from 'maintenance/vues/touche';

describe('La vue touche de la Maintenance', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
  });

  it('affiche un label à droite', function () {
    wrapper = shallowMount(Touche, {
      localVue, propsData: { label: 'texte' }
    });
    expect(wrapper.find('.label-droite').exists()).to.be(true);
    expect(wrapper.find('.label-gauche').exists()).to.be(false);
  });

  it('affiche un label à gauche', function () {
    wrapper = shallowMount(Touche, {
      localVue, propsData: { labelGauche: 'texte' }
    });
    expect(wrapper.find('.label-droite').exists()).to.be(false);
    expect(wrapper.find('.label-gauche').exists()).to.be(true);
  });

  it("n'affiche aucun label", function () {
    wrapper = shallowMount(Touche, { localVue });
    expect(wrapper.find('.label-droite').exists()).to.be(false);
    expect(wrapper.find('.label-gauche').exists()).to.be(false);
  });

  it('fait tourner le svg', function () {
    wrapper = shallowMount(Touche, {
      localVue, propsData: { rotation: 90 }
    });
    expect(wrapper.find('rect').attributes('transform')).to.be('rotate(90,14,14)');
    expect(wrapper.find('path').attributes('transform')).to.be('rotate(90,14,14)');
  });

  it('peut changer de couleur', function () {
    wrapper = shallowMount(Touche, {
      localVue, propsData: { couleur: 'verte' }
    });
    expect(wrapper.find('.touche.verte').exists()).to.be(true);
  });
});
