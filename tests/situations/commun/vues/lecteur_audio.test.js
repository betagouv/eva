import { shallowMount } from '@vue/test-utils';
import LecteurAudio from 'commun/vues/lecteur_audio';

describe('Le lecteur audio', function () {
  it('rend une balise audio', function () {
    const wrapper = shallowMount(LecteurAudio, { propsData: { src: '1', joueSon: false } });
    expect(wrapper.findAll('audio').length).toBe(1);
  });
});
