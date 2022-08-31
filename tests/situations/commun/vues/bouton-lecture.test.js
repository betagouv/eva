import { shallowMount } from '@vue/test-utils';
import BoutonLecture from 'commun/vues/bouton_lecture';
import { creeStore } from 'commun/modeles/store';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Vuex from 'vuex';

describe('Le bouton de lecture de message audio', function () {
  let store;
  let depotRessources;

  beforeEach(function () {
    store = creeStore();
  });

  function composant(question) {
    return shallowMount(BoutonLecture, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources,
          $traduction: () => {}
        }
      },
      props: question
    });
  }

  it("affiche l'icone play quand aucun son n'est joué", function () {
    const wrapper = composant({ nomTechnique: 'question1' });
    expect(wrapper.find('.icone-lecture').exists()).toBe(true);
  });

  describe('#start', function() {
    beforeEach(function () {
      depotRessources = {
        messageAudio: (nomTechnique) => {
          expect(nomTechnique).toEqual('question1');
        }
      };
    });

    it("joue le son et affiche l'icone pause", function (done) {
      const wrapper = composant({ nomTechnique: 'question1', joueSon: true });
      let sonJoue = false;
      wrapper.vm.joueurSon = {
        start: () => {
          sonJoue = true;
        }
      };
      wrapper.vm.joueSon = true;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.icone-pause').exists()).toBe(true);
        expect(sonJoue).toBe(true);
        done();
      });
    });

    it("stop le son quand le bouton n'est plus affiché", function () {
      const wrapper = composant({ nomTechnique: 'question1' });
      let sonStope = false;
      wrapper.vm.joueurSon = {
        stop: () => {
          sonStope = true;
        }
      };
      wrapper.unmount();
      expect(sonStope).toBe(true);
    });

    it("Joue la callback de fin une seule fois après la fin du son", function (done) {
      const wrapper = composant({ nomTechnique: 'question1' });
      wrapper.vm.audioBuffer = jest.fn();
      wrapper.vm.joueurSon = {
        stop: () => {},
        start: (buffer, callback) => {
          callback();
        }
      };
      const aFaireApresLeSon = jest.fn();
      wrapper.vm.demarreSon(aFaireApresLeSon);
      wrapper.vm.$nextTick(() => {
        expect(aFaireApresLeSon).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.joueSon).toBe(false);
        wrapper.vm.joueSon = true;
        wrapper.vm.$nextTick(() => {
          expect(aFaireApresLeSon).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });
  });

  describe('sans texte', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = composant({ nomTechnique: 'question1', avecTexte: false });
    });

    it("ajoute la classe", function () {
      expect(wrapper.find('.bouton-lecture').classes('bouton-arrondi')).toBe(false);
      expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--sans-texte')).toBe(true);
    });

    it("n'affiche pas de texte", function () {
      expect(wrapper.find('.bouton-lecture-texte').exists()).toBe(false);
    });
  });

  describe('avec du texte', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = composant({ nomTechnique: 'question1', avecTexte: true });
    });

    it("ajoute la classe", function () {
      expect(wrapper.find('.bouton-lecture').classes('bouton-arrondi')).toBe(true);
      expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--sans-texte')).toBe(false);
    });

    describe("quand le son n'est pas joué", function () {
      it("renvoie le texte 'Lecture'", function () {
        wrapper.setProps({ avecTexte: true });
        expect(wrapper.find('.bouton-lecture-texte').exists()).toBe(true);
        expect(wrapper.vm.texteBouton).toEqual('bouton_lecture.lecture');
      });
    });

    describe("quand le son est joué", function () {
      it("renvoie le texte 'Pause'", function (done) {
        expect(wrapper.find('.bouton-lecture-texte').exists()).toBe(true);
        wrapper.setProps({ avecTexte: true });
        depotRessources = {
          messageAudio: (nomTechnique) => {
            expect(nomTechnique).toEqual('question1');
          }
        };
        wrapper.vm.joueurSon = {
          start: () => {
            true;
          }
        };
        wrapper.vm.joueSon = true;
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.texteBouton).toEqual('bouton_lecture.pause');
          done();
        });
      });
    });
  });

  describe("coupe le son", function() {
    it('quand le store à un état et que la situation est terminée', function (done) {
      store.state.etat = DEMARRE;
      const wrapper = composant({ nomTechnique: 'question1' });
      wrapper.vm.coupeSon = jest.fn();
      store.commit('modifieEtat', FINI);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.coupeSon).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it("quand le store n'a pas de notion d'état (comme l'accueil)", function () {
      console.error = jest.fn();
      store = new Vuex.Store();
      composant({ nomTechnique: 'question1' });
      expect(console.error).not.toHaveBeenCalled();
      console.error.mockRestore();
    });
  });
});
