import { shallowMount } from '@vue/test-utils';
import VueLectureMessage from 'objets_trouves/vues/lecture-message';
import BoutonLecture from 'objets_trouves/vues/bouton-lecture';

describe('La lecture de message pour objets trouvés', function () {
  let question;
  let wrapper;

  beforeEach(function () {
    question = { id: 'message-bureau-mickael' };

    wrapper = shallowMount(VueLectureMessage, {
      propsData: { question }
    });
  });

  it('affiche un bouton de lecture du message dans le téléphone', function () {
    expect(wrapper.find('.telephone-conteneur').exists()).toBe(true);
    expect(wrapper.findComponent(BoutonLecture).exists()).toBe(true);
  });

  it('joue le message audio de la question', function () {
    expect(wrapper.findComponent(BoutonLecture).props().idQuestion).toBe(question.id);
  });

  it('affiche le bouton à la bonne position en fonction de la question', function () {
    const boutonLecture = wrapper.findComponent(BoutonLecture);
    expect(boutonLecture.classes('bouton-lecture--message-bureau-mickael')).toBe(true);
  });
});
