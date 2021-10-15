import { shallowMount, createLocalVue } from '@vue/test-utils';
import BoutonLecture from 'commun/vues/bouton_lecture';

describe('Le bouton de lecture de message audio', function () {
  it("affiche le bouton play quand aucun son n'est joué", function () {
    const wrapper = shallowMount(BoutonLecture, { propsData: { idQuestion: '1' } });
    expect(wrapper.find('.bouton-lecture').exists()).toBe(true);
  });

  it('joue le son et affiche le bouton pause', function (done) {
    const localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      messageAudio: (idQuestion) => {
        expect(idQuestion).toEqual('question1');
      }
    };

    const wrapper = shallowMount(BoutonLecture, {
      localVue: localVue,
      propsData: { idQuestion: 'question1', joueSon: true }
    });
    let sonJoue = false;
    wrapper.vm.joueurSon = {
      start: () => {
        sonJoue = true;
      }
    };
    wrapper.vm.joueSon = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.bouton-pause').exists()).toBe(true);
      expect(sonJoue).toBe(true);
      done();
    });
  });

  it("stop le son quand le bouton n'est plus affiché", function () {
    const wrapper = shallowMount(BoutonLecture, { propsData: { idQuestion: '1' } });
    let sonStope = false;
    wrapper.vm.joueurSon = {
      stop: () => {
        sonStope = true;
      }
    };
    wrapper.destroy();
    expect(sonStope).toBe(true);
  });
});
