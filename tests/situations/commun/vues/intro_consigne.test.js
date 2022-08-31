import { shallowMount } from '@vue/test-utils';
import { CONSIGNE_FINI } from 'commun/vues/consigne';
import IntroConsigne from 'commun/vues/intro_consigne';
import MockAudioNode from '../aides/mock_audio_node';

describe('La vue intro-consigne', function () {
  let wrapper;
  let depotRessources;

  beforeEach(function () {
    depotRessources = new class {
      casque () {
        return { src: 'casque.png' };
      }

      existeFondConsigne () {
        return false;
      }

      fondConsigne () {
        throw new Error('fondConsigne non défini');
      }

      consigneDemarrage () {
        return new MockAudioNode();
      }

      consigneCommune () {
        return new MockAudioNode();
      }
    }();
    wrapper = shallowMount(IntroConsigne, {
      props: { message: 'contenu', identifiantSituation: 'securite' },
      global: {
        mocks: {
          $depotRessources: depotRessources,
          $traduction: () => {}
        }
      }
    });
  });

  it("a un titre par défaut si aucun titre n'est donné", function () {
    expect(wrapper.vm.titre).toEqual('situation.ecouter-consigne');
  });

  it('affiche la vue consigne au clic', function () {
    expect(wrapper.vm.ecran).toEqual('intro');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).toEqual('consigne');
  });

  it('permet de passer directement au parc en appuyant sur S', function () {
    wrapper.trigger('keydown', { key: 's' });
    expect(wrapper.emitted(CONSIGNE_FINI).length).toEqual(1);
  });

  describe("l'image de fond", function () {
    it("quand il n'y en a pas ne l'affiche pas", function () {
      expect(wrapper.find('.fond-consigne').exists()).toBe(false);
    });

    it("quand il y en a une, l'affiche", function () {
      depotRessources.existeFondConsigne = () => { return true; };
      depotRessources.fondConsigne = () => { return { src: 'une_image.png' }; };
      wrapper = shallowMount(IntroConsigne, {
        props: { message: 'contenu', identifiantSituation: 'securite' },
        global: {
          mocks: {
            $depotRessources: depotRessources,
            $traduction: () => {}
          }
        }
      });
      expect(wrapper.find('.fond-consigne').element.getAttribute('src')).toEqual('une_image.png');
    });
  });
});
