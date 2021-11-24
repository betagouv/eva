import { shallowMount } from '@vue/test-utils';
import ReponseAudioQcm from 'commun/vues/reponse_audio_qcm';

describe('Le lecteur audio', function () {
  it("rend l'image d'un haut parleur", function () {
    const wrapper = shallowMount(ReponseAudioQcm, { propsData: { questionnaire: 'agenda', idReponse: 1, joueSon: false } });
    expect(wrapper.findAll('svg').length).toBe(1);
  });
});
