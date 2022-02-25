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

  describe('sans texte', function () {
    let wrapper;
    let localVue;

    beforeEach(function () {
      localVue = createLocalVue();
      localVue.prototype.$traduction = () => {};
      wrapper = shallowMount(BoutonLecture, {
        localVue,
        propsData: {
          nomTechnique: 'question1',
          avecTexte: false
        }
      });
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
    let localVue;

    beforeEach(function () {
      localVue = createLocalVue();
      localVue.prototype.$traduction = () => {};
      wrapper = shallowMount(BoutonLecture, {
        localVue,
        propsData: {
          nomTechnique: 'question1',
          avecTexte: true
        }
      });
    });

    it("ajoute la classe", function () {
      expect(wrapper.find('.bouton-lecture').classes('bouton-arrondi')).toBe(true);
      expect(wrapper.find('.bouton-lecture').classes('bouton-lecture--sans-texte')).toBe(false);
    });

    it("renvoie le texte 'Lecture'", function () {
      expect(wrapper.find('.bouton-lecture-texte').exists()).toBe(true);
      expect(wrapper.vm.texteBouton).toEqual('bouton_lecture.lecture');
    });
  });
});
