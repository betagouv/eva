import { shallowMount, createLocalVue } from '@vue/test-utils';
import Consigne, { CONSIGNE_FINI } from 'commun/vues/consigne';
import MockAudioNode from '../aides/mock_audio_node';

describe('La vue consigne', function () {
  let wrapper;

  beforeEach(function () {
    const depotRessources = new class {
      casque () {
        return { src: '' };
      }

      clavier () {
        return { src: '' };
      }

      consigneDemarrage () {
        return new MockAudioNode();
      }

      consigneCommune () {
        return new MockAudioNode();
      }
    }();
    const localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    wrapper = shallowMount(Consigne, {
      propsData: { message: 'contenu', ressourceConsigne: 'consigneDemarrage' },
      localVue
    });
  });

  it("joue la consigne à l'affichage du composant", function () {
    expect(wrapper.vm.consigne).to.be.an('object');
  });

  it('émets le message de la fin et se cache', function () {
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(CONSIGNE_FINI).length).to.eql(1);
  });

  it('coupe le son quand on clique sur le bouton', function () {
    let consigneArretee = false;
    wrapper.vm.consigne = {
      stop: () => {
        consigneArretee = true;
      }
    };
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(CONSIGNE_FINI).length).to.eql(1);
    expect(consigneArretee).to.equal(true);
  });
});
