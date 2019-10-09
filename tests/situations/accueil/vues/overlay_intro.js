import { shallowMount, createLocalVue } from '@vue/test-utils';
import OverlayIntro from 'accueil/vues/overlay_intro';
import MockAudioNode from '../../commun/aides/mock_audio_node';

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
    wrapper = shallowMount(OverlayIntro, { localVue });
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
});
