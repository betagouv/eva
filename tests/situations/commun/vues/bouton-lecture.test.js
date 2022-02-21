import { shallowMount, createLocalVue } from '@vue/test-utils';
import BoutonLecture from 'commun/vues/bouton_lecture';

describe('Le bouton de lecture de message audio', function () {
  it("affiche l'icone play quand aucun son n'est joué", function () {
    const wrapper = shallowMount(BoutonLecture, { propsData: { nomTechnique: 'question1' } });
    expect(wrapper.find('.icone-lecture').exists()).toBe(true);
  });

  it("joue le son et affiche l'icone pause", function (done) {
    const localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      messageAudio: (nomTechnique) => {
        expect(nomTechnique).toEqual('question1');
      }
    };

    const wrapper = shallowMount(BoutonLecture, {
      localVue: localVue,
      propsData: { nomTechnique: 'question1', joueSon: true }
    });
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
    const wrapper = shallowMount(BoutonLecture, { propsData: { nomTechnique: 'question1' } });
    let sonStope = false;
    wrapper.vm.joueurSon = {
      stop: () => {
        sonStope = true;
      }
    };
    wrapper.destroy();
    expect(sonStope).toBe(true);
  });

  describe('avec du texte', function () {
    let wrapper;
    let localVue;

    beforeEach(function () {
      localVue = createLocalVue();
      localVue.prototype.$traduction = () => {};
      wrapper = shallowMount(BoutonLecture, {
        localVue,
        propsData: {
          nomTechnique: 'question1'
        }
      });
    });

    it("ajoute la classe bouton-lecture--avec-texte", function (done) {
      expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--avec-texte')).toBe(false);
      wrapper.setProps({ avecTexte: true });
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--avec-texte')).toBe(true);
        done();
      });
    });

    describe("quand le son n'est pas joué", function () {
      it("renvoie le texte 'Lecture'", function (done) {
        wrapper.setProps({ avecTexte: true });
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--avec-texte')).toBe(true);
          expect(wrapper.vm.texteBouton).toEqual('bouton_lecture.lecture');
          done();
        });
      });
    });

    describe("quand le son est joué", function () {
      it('renvoie le texte "stop"', function (done) {
        wrapper.setProps({ avecTexte: true });
        localVue.prototype.$depotRessources = {
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
          expect(wrapper.vm.texteBouton).toEqual('bouton_lecture.stop');
          done();
        });
      });
    });
  });
});
