import { mount } from '@vue/test-utils';
import Index from 'accueil/vues/index';
import OverlayAttente from 'commun/vues/overlay_attente';
import OverlayErreurChargement from 'commun/vues/overlay_erreur_chargement';
import OverlayErreur from 'accueil/vues/overlay_erreur';
import Accueil from 'accueil/vues/accueil';
import { traduction } from 'commun/infra/internationalisation';
import Vuex from 'vuex';

describe('La vue index', function () {
  let depotRessources;

  beforeEach(function () {
    depotRessources = new class {
      chargement () { return Promise.resolve(); }
    }();
  });

  function composant (store, props = {}) {
    const plugins = store ? [store]: [];
    return mount(Index, {
      shallow: true,
      global: {
        plugins: plugins,
        mocks: {
          $depotRessources: depotRessources,
          $traduction: traduction
        }
      },
      props: props
    });
  }

  it('affiche les composants en chargement', function () {
    const wrapper = composant();
    expect(wrapper.findComponent(Accueil).exists()).toBe(false);
    expect(wrapper.findComponent(OverlayAttente).exists()).toBe(true);
  });

  describe('quand elle a fini de charger', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = composant();
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
        depotRessources = {
          chargement: () => { return Promise.reject({}); }
        };

        wrapper = composant();
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
        depotRessources = {
          chargement: () => { return Promise.reject(new Error('erreur innatendue')); }
        };

        wrapper = composant();
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
        depotRessources = {
          chargement: () => { return Promise.reject(new Error('Unable to decode audio data')); }
        };

        wrapper = composant();
      });

      it('affiche la vue erreur lecture son impossible', function () {
        expect(wrapper.findComponent(Accueil).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayAttente).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreurChargement).exists()).toBe(false);
        expect(wrapper.findComponent(OverlayErreur).exists()).toBe(true);
        expect(wrapper.findComponent(OverlayErreur).props('titre')).toBe('situation.erreur_lecture_son.titre');
        expect(consoleError).not.toHaveBeenCalled();
      });
    });

    describe('quand elle rencontre une erreur de décodage audio', function () {
      beforeEach(function () {
        depotRessources = {
          chargement: () => { return Promise.reject(new Error('An unknown error occured while processing decodeAudioData')); }
        };

        wrapper = composant();
      });

      it('affiche la vue erreur lecture son impossible', function () {
        expect(wrapper.findComponent(OverlayErreur).exists()).toBe(true);
        expect(wrapper.findComponent(OverlayErreur).props('titre')).toBe('situation.erreur_lecture_son.titre');
      });
    });

    describe("quand la passation est faite sur smartphone", function() {
      beforeEach(function () {
        const store = new Vuex.Store({
          state: {
            estConnecte: false,
            evaluationTerminee: false
          }
        });
        wrapper=composant(store, { estSmartphone: true });
      });

      it("affiche la vue erreur utilisation d'un smartphone", function () {
        expect(wrapper.vm.afficheErreurSmartphone).toBe(true);
        expect(wrapper.findComponent(OverlayErreur).exists()).toBe(true);
        expect(wrapper.findComponent(OverlayErreur).props('titre')).toBe('situation.erreur_utilisation_smartphone.titre');
      });
    });
  });
});
