import { shallowMount, createLocalVue } from '@vue/test-utils';
import Index from 'accueil/vues/index';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import OverlayErreurLectureSon from 'accueil/vues/overlay_erreur_lecture_son';
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
    let consoleError;

    beforeEach(function () {
      consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    describe("quand c'est une erreur sans message", function() {
      beforeEach(function () {
        localVue.prototype.$depotRessources = {
          chargement: () => { return Promise.reject({}); }
        };

        wrapper = shallowMount(Index, { localVue });
      });

      it('affiche la vue erreur de chargement', function () {
        expect(wrapper.findComponent(Accueil).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreurChargement).exists()).toBe(true);
        expect(consoleError).toHaveBeenCalled();
      });
    });

    describe("quand c'est une erreur innatendue", function() {
      beforeEach(function () {
        localVue.prototype.$depotRessources = {
          chargement: () => { return Promise.reject(new Error('erreur innatendue')); }
        };

        wrapper = shallowMount(Index, { localVue });
      });

      it('affiche la vue erreur de chargement', function () {
        expect(wrapper.findComponent(Accueil).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreurChargement).exists()).toBe(true);
        expect(consoleError).toHaveBeenCalled();
      });
    });

    describe('quand elle ne peut pas lire les mp3', function () {
      beforeEach(function () {
        localVue.prototype.$depotRessources = {
          chargement: () => { return Promise.reject(new Error('Unable to decode audio data')); }
        };

        wrapper = shallowMount(Index, { localVue });
      });

      it('affiche la vue erreur lecture son impossible', function () {
        expect(wrapper.findComponent(Accueil).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreurChargement).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreurLectureSon).exists()).toBe(true);
        expect(consoleError).not.toHaveBeenCalled();
      });
    });

    describe('quand elle rencontre une erreur de décodage audio', function () {
      beforeEach(function () {
        localVue.prototype.$depotRessources = {
          chargement: () => { return Promise.reject(new Error('An unknown error occured while processing decodeAudioData')); }
        };

        wrapper = shallowMount(Index, { localVue });
      });

      it('affiche la vue erreur lecture son impossible', function () {
        expect(wrapper.findComponent(OverlayErreurLectureSon).exists()).toBe(true);
        expect(consoleError).not.toHaveBeenCalled();
      });
    });
  });
});
