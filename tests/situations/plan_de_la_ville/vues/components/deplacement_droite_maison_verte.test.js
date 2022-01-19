import { shallowMount, createLocalVue } from '@vue/test-utils';

import DeplacementDroite from 'plan_de_la_ville/vues/components/deplacement_droite_maison_verte.vue';
import ChoixBidirectionnel from 'commun/vues/components/choix_bidirectionnel';

describe('La vue Déplacement droite maison verte', function () {
  let wrapper;

  beforeEach(function () {
    const localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      personnage: () => { return { src: 'personnage.png' }; }
    };
    wrapper = shallowMount(DeplacementDroite, { localVue });
  });

  describe('#deplacementValide', function () {
    it("émet l'évènement 'action'", function () {
      wrapper.vm.deplacementValide();
      expect(wrapper.emitted()).toHaveProperty('action');
    });
  });

  describe('sur ordinateur', function () {
    it('affiche les touches flèches du clavier', function () {
      expect(wrapper.findComponent(ChoixBidirectionnel).exists()).toBe(true);
    });
  });

  describe('#deplacePersonnage', function () {
    it('ajoute la classe deplacement-droite sur le personnage pour le choix déplacement droite', function (done) {
      expect(wrapper.find('.personnage').classes('deplacement-droite')).toBe(false);
      wrapper.vm.deplace = true;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.personnage').classes('deplacement-droite')).toBe(true);
        done();
      });
    });
  });

  describe('#vacillePersonnage', function () {
    it('ajoute la classe mauvais-deplacement sur le personnage pour le choix déplacement gauche', function (done) {
      expect(wrapper.find('.personnage').classes('mauvais-deplacement')).toBe(false);
      wrapper.vm.vacille = true;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.personnage').classes('mauvais-deplacement')).toBe(true);
        done();
      });
    });
  });
});
