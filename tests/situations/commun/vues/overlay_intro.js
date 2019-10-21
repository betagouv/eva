import { shallowMount, createLocalVue } from '@vue/test-utils';
import OverlayIntro from 'commun/vues/overlay_intro';
import MockAudioNode from '../aides/mock_audio_node';

describe("La vue d'introduction", function () {
  let wrapper;

  beforeEach(function () {
    const depotRessources = new class {
      casque () {
        return { src: '' };
      }

      consigneAccueil () {
        return new MockAudioNode();
      }
    }();
    const localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
    wrapper = shallowMount(OverlayIntro, { propsData: { message: 'contenu' }, localVue });
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

  it('disable le bouton tant que la consigne est en cours de lecture', function () {
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    expect(wrapper.vm.consigneEnCours).to.eql(true);
    expect(wrapper.vm.passeDesactive).to.be(true);

    wrapper.setData({ consigneEnCours: false });
    expect(wrapper.vm.passeDesactive).to.be(false);
  });

  it('affiche la vue contexte au clic et emet "passe" a la fin', function () {
    expect(wrapper.vm.ecran).to.eql('consigne');
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.ecran).to.eql('contexte');
    wrapper.setData({ consigneEnCours: false });

    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('passe').length).to.eql(1);
  });

  it('permet de passer directement au parc en appuyant sur S', function () {
    wrapper.trigger('keydown', { key: 's' });
    expect(wrapper.emitted('passe').length).to.eql(1);
  });
});
