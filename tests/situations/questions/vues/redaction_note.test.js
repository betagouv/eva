import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRedactionNote from 'questions/vues/redaction_note';

describe('La vue de la question RedactionNote', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = {};
    localVue = createLocalVue();
    localVue.prototype.$traduction = () => {};
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
