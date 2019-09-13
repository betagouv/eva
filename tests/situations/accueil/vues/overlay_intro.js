import { shallowMount } from '@vue/test-utils';
import OverlayIntro from 'accueil/vues/overlay_intro';

describe("La vue d'introduction", function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(OverlayIntro);
  });

  it('affiche la page', function () {
    expect(wrapper.findAll('h2').length).to.eql(1);
  });
});
