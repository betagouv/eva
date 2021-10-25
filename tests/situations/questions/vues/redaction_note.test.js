import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRedactionNote from 'questions/vues/redaction_note';
import BoutonLecture from 'commun/vues/bouton_lecture';

describe('La vue de la question RedactionNote', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { id: 154, nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = {
      existeMessageAudio: () => false
    };
  });

  it("affiche le bouton lecture s'il existe un son", function () {
    localVue.prototype.$depotRessources.existeMessageAudio = () => true;
    const vue = shallowMount(VueRedactionNote, { localVue, propsData: { question } });

    expect(vue.findComponent(BoutonLecture).exists()).toBe(true);
  });

  it("n'affiche pas le bouton lecture s'il n'existe pas de son", function () {
    localVue.prototype.$depotRessources.existeMessageAudio = () => false;
    const vue = shallowMount(VueRedactionNote, { localVue, propsData: { question } });

    expect(vue.findComponent(BoutonLecture).exists()).toBe(false);
  });

  it('affiche une zone de saisie de texte', function () {
    const vue = shallowMount(VueRedactionNote, { localVue, propsData: { question } });
    expect(vue.find('textarea').exists()).toBe(true);
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = shallowMount(VueRedactionNote, { localVue, propsData: { question } });
    expect(vue.find('.question-bouton').exists()).toBe(true);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function () {
    const vue = shallowMount(VueRedactionNote, { localVue, propsData: { question } });
    vue.find('textarea').setValue('     Ma réponse  ');
    vue.find('button').trigger('click');
    expect(vue.emitted('reponse').length).toEqual(1);
    expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'Ma réponse' });
  });
});
