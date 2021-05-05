import { shallowMount, createLocalVue } from '@vue/test-utils';
import Index from 'accueil/vues/index';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import Accueil from 'accueil/vues/accueil';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue index', function () {
  let depotRessources;
  let localVue;

  beforeEach(function () {
    depotRessources = new class {
      chargement () { return Promise.resolve(); }
    }();

    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    localVue.prototype.$traduction = traduction;
  });

  it('affiche les composants en chargement', function () {
    const wrapper = shallowMount(Index, { localVue });
    expect(wrapper.findComponent(Accueil).exists()).toBe(false);
    expect(wrapper.findComponent(OverlayAttente).exists()).toBe(true);
  });

  describe('quand elle a fini de charger', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = shallowMount(Index, { localVue });
    });

    it('affiche les composants une fois chargé', function () {
      expect(wrapper.findComponent(Accueil).exists()).toBe(true);
      expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
    });
  });

  describe('quand elle a fini de charger avec une erreur', function () {
    let wrapper;

    beforeEach(function () {
      depotRessources = new class {
        chargement () { return Promise.reject(new Error()); }
      }();
      localVue.prototype.$depotRessources = depotRessources;
      wrapper = shallowMount(Index, { localVue });
    });

    it('affiche les composants lorsque le chargement a échoué', function () {
      expect(wrapper.findComponent(Accueil).exists()).toBe(false);
      expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
      expect(wrapper.findComponent(OverlayErreurChargement).exists()).toBe(true);
    });
  });
});
