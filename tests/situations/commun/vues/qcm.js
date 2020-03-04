import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQCM from 'commun/vues/qcm';

describe('La vue de la question QCM', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { choix: [] };
    localVue = createLocalVue();
  });

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAll('input[type=radio]').length).to.equal(5);
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.contains('.question-bouton')).to.be(true);
  });

  it("désactive le bouton lorsqu'aucune réponse n'est sélectionnée", function () {
    question.choix = [{ id: 'uid-32' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.find('.question-bouton').attributes('disabled')).to.eql('disabled');

    vue.find('input[type=radio][value=uid-32]').setChecked();
    expect(vue.find('.question-bouton').attributes('disabled')).to.be(undefined);
  });

  it('emet un événement réponse quand on appuie sur le bouton envoi', function () {
    question.choix = [{ id: 'uid-32' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.find('.question-bouton').trigger('click');
    expect(vue.emitted('reponse').length).to.eql(1);
    expect(vue.emitted('reponse')[0][0]).to.eql('uid-32');
  });

  it('désactive le bouton une fois répondu pour éviter le double click', function () {
    question.choix = [{ id: 'uid-32' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.find('.question-bouton').trigger('click');
    expect(vue.find('.question-bouton').attributes('disabled')).to.eql('disabled');
  });
});
