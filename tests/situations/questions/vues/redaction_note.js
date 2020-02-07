import { mount, createLocalVue } from '@vue/test-utils';
import { EVENEMENT_REPONSE } from 'questions/vues/question';
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
    const vue = mount(VueRedactionNote, { localVue, propsData: { question } });
    expect(vue.contains('textarea')).to.be(true);
  });

  it("affiche l'image de la question", function () {
    question.illustration = 'accident-carine';
    const vue = mount(VueRedactionNote, { localVue, propsData: { question } });
    expect(vue.contains('.question-illustration')).to.be(true);
    expect(vue.find('.question-illustration').attributes('src')).to.equal('accident-carine');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = mount(VueRedactionNote, { localVue, propsData: { question } });
    expect(vue.contains('.question-bouton')).to.be(true);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function () {
    const vue = mount(VueRedactionNote, { localVue, propsData: { question } });
    vue.find('textarea').setValue('     Ma réponse  ');
    vue.find('button').trigger('click');
    expect(vue.emitted(EVENEMENT_REPONSE).length).to.eql(1);
    expect(vue.emitted(EVENEMENT_REPONSE)[0][0]).to.eql('Ma réponse');
  });
});
