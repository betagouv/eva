import { shallowMount, createLocalVue } from '@vue/test-utils';
import { CONSIGNE_FINI } from 'commun/vues/consigne';
import IntroConsigne from 'commun/vues/intro_consigne';
import MockAudioNode from '../aides/mock_audio_node';

describe('La vue intro-consigne', function () {
  let wrapper;

  beforeEach(function () {
    const depotRessources = new class {
      casque () {
        return { src: '' };
      }

      consigne () {
        return new MockAudioNode();
      }

      consigneCommune () {
        return new MockAudioNode();
      }
    }();
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    wrapper = shallowMount(IntroConsigne, {
      propsData: { message: 'contenu', identifiantSituation: 'securite' },
      localVue
    });
  });

  it("a un titre par défaut si aucun titre n'est donné", function () {
    expect(wrapper.vm.titre).to.eql('situation.ecouter-consigne');
  });

  it('affiche la vue consigne au clic', function () {
    expect(wrapper.vm.ecran).to.eql('intro');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('consigne');
  });

  it('permet de passer directement au parc en appuyant sur S', function () {
    wrapper.trigger('keydown', { key: 's' });
    expect(wrapper.emitted(CONSIGNE_FINI).length).to.eql(1);
  });
});
