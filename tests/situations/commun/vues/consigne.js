import { shallowMount, createLocalVue } from '@vue/test-utils';
import Consigne from 'commun/vues/consigne';
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

  it("a un titre par défaut si aucun titre n'est donné", function () {
    expect(wrapper.vm.titre).to.eql('situation.ecouter-consigne');
  });

  it("joue la consigne à l'affichage de la vue contexte", function () {
    expect(wrapper.vm.consigneEnCours).to.eql(false);
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    expect(wrapper.vm.consigneEnCours).to.eql(true);
  });

  it('désactive le bouton tant que la consigne est en cours de lecture', function () {
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    expect(wrapper.vm.consigneEnCours).to.eql(true);
    expect(wrapper.vm.aVousDeJouerDesactive).to.be(true);

    wrapper.setData({ consigneEnCours: false });
    expect(wrapper.vm.aVousDeJouerDesactive).to.be(false);
  });

  it('affiche la vue contexte au clic', function () {
    expect(wrapper.vm.ecran).to.eql('consigne');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    expect(wrapper.find('button').text()).to.eql('accueil.intro_contexte.bouton');
  });

  it('émets le message de la fin et se cache', function () {
    wrapper.find('button').trigger('click');
    wrapper.setData({ consigneEnCours: false });

    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('fini').length).to.eql(1);
  });

  it('permet de passer directement au parc en appuyant sur S', function () {
    wrapper.trigger('keydown', { key: 's' });
    expect(wrapper.emitted('fini').length).to.eql(1);
  });
});
