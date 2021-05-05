import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueLectureMessage from 'objets_trouves/vues/lecture-message';
import { creeStore } from 'objets_trouves/modeles/store';
import BoutonLecture from 'objets_trouves/vues/bouton-lecture';

describe('La lecture de message pour objets trouvés', function () {
  let question;
  let store;
  let wrapper;
  let localVue;
  let idQuestionMessageAudio;

  beforeEach(function () {
    localVue = createLocalVue();
    question = { id: 'message-bureau-mickael' };
    store = creeStore();
    localVue.prototype.$depotRessources = {
      messageAudio: (questionId) => {
        idQuestionMessageAudio = questionId;
        return 'chemin ressource audio';
      }
    };

    wrapper = shallowMount(VueLectureMessage, {
      propsData: { question },
      store,
      localVue
    });
  });

  it('affiche un bouton de lecture du message dans le téléphone', function () {
    expect(wrapper.find('.telephone-conteneur').exists()).toBe(true);
    expect(wrapper.findComponent(BoutonLecture).exists()).toBe(true);
  });

  it('joue le message audio de la question', function () {
    expect(idQuestionMessageAudio).toEqual(question.id);
  });

  it('affiche le bouton à la bonne position en fonction de la question', function () {
    const boutonLecture = wrapper.findComponent(BoutonLecture);
    expect(boutonLecture.classes('bouton-lecture--message-bureau-mickael')).toBe(true);
  });
});
