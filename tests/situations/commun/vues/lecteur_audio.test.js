import { shallowMount } from '@vue/test-utils';
import LecteurAudio from 'commun/vues/lecteur_audio';

describe('Le lecteur audio', function () {
  it("rend l'image d'un haut parleur", function () {
    const wrapper = shallowMount(LecteurAudio, { propsData: { questionnaire: 'agenda', idReponse: 1, joueSon: false } });
    expect(wrapper.findAll('svg').length).toBe(1);
  });
});
