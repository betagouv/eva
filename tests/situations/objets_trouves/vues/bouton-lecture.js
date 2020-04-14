import { shallowMount } from '@vue/test-utils';
import BoutonLecture from 'objets_trouves/vues/bouton-lecture';

describe('Le bouton de lecture de message audio', function () {
  it('rend une balise audio', function () {
    const wrapper = shallowMount(BoutonLecture, { propsData: { sonMessage: '1' } });
    expect(wrapper.findAll('audio').length).to.equal(1);
  });

  it("affiche le bouton play quand aucun son n'est joué", function () {
    const wrapper = shallowMount(BoutonLecture, { propsData: { sonMessage: '1' } });
    wrapper.vm.joueSon = false;
    expect(wrapper.findAll('button svg path').at(0).classes('bouton-lecture')).to.be(true);
  });

  it('joue le son et affiche le bouton pause', function () {
    let sonJoue = false;
    HTMLMediaElement.prototype.play = () => { sonJoue = true; };
    const wrapper = shallowMount(BoutonLecture, { propsData: { sonMessage: '1', joueSon: true } });
    wrapper.vm.joueSon = true;
    expect(wrapper.findAll('button svg path').at(0).classes('bouton-pause')).to.be(true);
    expect(sonJoue).to.be(true);
  });
});
