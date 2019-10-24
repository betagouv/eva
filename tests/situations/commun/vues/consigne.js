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

      consigne () {
        return new MockAudioNode();
      }

      consigneCommune () {
        return new MockAudioNode();
      }
    }();
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    wrapper = shallowMount(Consigne, { propsData: { message: 'contenu' }, localVue });
  });

  it("joue la consigne à l'affichage du composant", function () {
    expect(wrapper.vm.consigneEnCours).to.eql(true);
  });

  it('désactive le bouton tant que la consigne est en cours de lecture', function () {
    expect(wrapper.vm.aVousDeJouerDesactive).to.be(true);

    wrapper.setData({ consigneEnCours: false });
    expect(wrapper.vm.aVousDeJouerDesactive).to.be(false);
  });

  it('émets le message de la fin et se cache', function () {
    wrapper.setData({ consigneEnCours: false });

    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(CONSIGNE_FINI).length).to.eql(1);
  });

  it('permet de passer directement au parc en appuyant sur S', function () {
    wrapper.trigger('keydown', { key: 's' });
    expect(wrapper.emitted(CONSIGNE_FINI).length).to.eql(1);
  });
});
