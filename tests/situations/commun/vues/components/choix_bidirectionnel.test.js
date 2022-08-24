import { shallowMount, createLocalVue } from '@vue/test-utils';

import MockDepotRessources from '../../aides/mock_depot_ressources_choix_bidirectionnel';
import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';
import Touche from 'commun/vues/components/touche';
import Keypress from 'vue-keypress';

describe('La vue flèches clavier', function () {
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new MockDepotRessources();
    wrapper = shallowMount(ChoixBidirectionnel, { localVue });
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

  describe('sur ordinateur', function () {
    beforeEach(function () {
      wrapper.vm.estSmartphoneOuTablette = false;
    });

    it("N'affiche pas les boutons permettant de répondre à la souris", function () {
      expect(wrapper.find('button').exists()).toBe(false);
    });
  });

  describe('sur tablette', function () {
    beforeEach(function () {
      wrapper.vm.estSmartphoneOuTablette = true;
    });

    it('affiche les boutons permettant de répondre avec le doigt', function () {
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('.touches-horizontales').exists()).toBe(false);
    });

    it("rajoute la classe action-fleches--animation sur le bouton de gauche pour le choix 'gauche'", function (done) {
      expect(wrapper.find('.bouton-arrondi:first-child').classes('actions-fleches--animation')).toBe(false);
      wrapper.vm.choixFait = 'gauche';
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.bouton-arrondi:first-child').classes('actions-fleches--animation')).toBe(true);
        done();
      });
    });

    it("rajoute la classe action-fleches--animation sur le bouton de droite pour le choix 'droite' ", function (done) {
      expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(false);
      wrapper.vm.choixFait = 'droite';

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(true);
        done();
      });
    });
  });
});
