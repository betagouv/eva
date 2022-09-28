import { shallowMount } from '@vue/test-utils';

import MockDepotRessources from '../../aides/mock_depot_ressources_choix_bidirectionnel';
import ChoixBidirectionnel, { flecheGauche, flecheDroite } from 'commun/vues/components/choix_bidirectionnel';
import Touche from 'commun/vues/components/touche';
import { keyConfiguration } from 'vue3-keypress';

describe('La vue flèches clavier', function () {
  let wrapper;

  describe('avec un composant activé', function () {
    beforeEach(function () {
      wrapper = shallowMount(ChoixBidirectionnel, {
        global: {
          mocks: {
            $depotRessources: new MockDepotRessources()
          }
        },
      });
    });

    it('affiche les composants une fois chargé', function () {
      expect(wrapper.findComponent(Touche).exists()).toBe(true);
    });

    it('configure les touches du clavier', function () {
      expect(keyConfiguration["keydown"].map(c => c.keyCode)).toEqual([flecheGauche, flecheDroite]);
      keyConfiguration["keydown"][0].success();
      expect(wrapper.vm.choixFait).toEqual('Gauche');
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

    describe('événements émis quand on fait un choix', function () {
      it("quand on choisit la gauche", function (done) {
        wrapper.vm.choixFait = 'Gauche';
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted()).toHaveProperty('actionGauche');
          wrapper.vm.choixFait = null;
          wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted()).toHaveProperty('animationGaucheTerminee');
            done();
          });
        });
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
        wrapper.vm.choixFait = 'Gauche';
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.bouton-arrondi:first-child').classes('actions-fleches--animation')).toBe(true);
          done();
        });
      });

      it("rajoute la classe action-fleches--animation sur le bouton de droite pour le choix 'droite' ", function (done) {
        expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(false);
        wrapper.vm.choixFait = 'Droite';

        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.bouton-arrondi:last-child').classes('actions-fleches--animation')).toBe(true);
          done();
        });
      });
    });
  });

  describe('avec un composant désactivé', function () {
    beforeEach(function () {
      wrapper = shallowMount(ChoixBidirectionnel, {
        propsData: {
          desactive: true
        },
        global: {
          mocks: {
            $depotRessources: new MockDepotRessources()
          }
        },
      });
    });

    it('peut désactive le composant', function () {
      keyConfiguration["keydown"][0].success();
      expect(wrapper.vm.choixFait).toEqual(null);
    });
  });
});

