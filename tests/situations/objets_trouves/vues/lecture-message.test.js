import { shallowMount } from '@vue/test-utils';
import VueLectureMessage from 'objets_trouves/vues/lecture-message';
import BoutonLectureAvecDepotRessources from 'commun/vues/bouton_lecture_avec_depot_ressources';

describe('La lecture de message pour objets trouvés', function () {
  let question;
  let wrapper;

  beforeEach(function () {
    question = { audioRepondeur: 'message-bureau-mickael' };

    wrapper = shallowMount(VueLectureMessage, {
      propsData: { question }
    });
  });

  it('affiche un bouton de lecture du message dans le téléphone', function () {
    expect(wrapper.find('.telephone-conteneur').exists()).toBe(true);
    expect(wrapper.findComponent(BoutonLectureAvecDepotRessources).exists()).toBe(true);
  });

  it('joue le message audio de la question', function () {
    expect(wrapper.findComponent(BoutonLectureAvecDepotRessources).props().nomTechnique).toBe(question.audioRepondeur);
  });

  it('affiche le bouton à la bonne position en fonction de la question', function () {
    const boutonLecture = wrapper.findComponent(BoutonLectureAvecDepotRessources);
    expect(boutonLecture.classes('bouton-lecture--message-bureau-mickael')).toBe(true);
  });
});
