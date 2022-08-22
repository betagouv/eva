import OverlayErreur from 'accueil/vues/overlay_erreur';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { traduction } from 'commun/infra/internationalisation';

describe('Le composant overlay erreur', function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
  });

  describe('quand il peut être ignoré', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = shallowMount(OverlayErreur, { localVue, propsData: { boutonIgnorer: true } });
    });

    it("affiche le bouton et envoi l'évènement ignore erreur", function (done) {
      expect(wrapper.findComponent('button').exists()).toBe(true);
      wrapper.findComponent('button').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted()).toHaveProperty('ignoreErreur');
        done();
      });
    });
  });

  describe('quand il ne peut pas être ignoré', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = shallowMount(OverlayErreur, { localVue, propsData: { boutonIgnorer: false } });
    });

    it("n'affiche pas le bouton", function () {
      expect(wrapper.findComponent('button').exists()).toBe(false);
    });
  });
});
