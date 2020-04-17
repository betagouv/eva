import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQCM from 'commun/vues/qcm';
import LecteurAudio from 'commun/vues/lecteur_audio';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

describe('La vue de la question QCM', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { id: 154, choix: [] };
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = {
      reponseAudio: () => {
        return 'chemin de la ressource';
      }
    };
  });

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAll('input[type=radio]').length).to.equal(5);
  });

  it('affiche un control audio sur chaque réponse', function () {
    question.choix = [{ audio: '1' }, { audio: '1' }, { audio: '1' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAll(LecteurAudio).length).to.equal(3);
  });

  it('affiche une image sur chaque réponse', function () {
    question.choix = [{ image: '1' }, { image: '1' }, { image: '1' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAll('img').length).to.equal(3);
  });

  describe('affiche une question de type numérique', function () {
    let uneQuestionNumerique;

    before(function () {
      uneQuestionNumerique = () => {
        question.numerique = true;
        return shallowMount(VueQCM, { localVue, propsData: { question } });
      };
    });

    it('affiche un champ numérique', function () {
      const inputNumerique = uneQuestionNumerique().findAll('input[type=text]');
      expect(inputNumerique.length).to.equal(1);
      expect(inputNumerique.at(0).classes('numerique-input')).to.be(true);
    });

    it("Sait espacer les chiffres dans l'input pour les question de type numérique", function () {
      question.espacerChiffres = true;
      const conteneurChiffresEspaces = uneQuestionNumerique().find('.numerique-input-conteneur');
      expect(conteneurChiffresEspaces.classes('chiffres-espaces')).to.be(true);
    });

    it("Sait espacer les chiffres dans l'input pour les question de type numérique", function () {
      question.espacerChiffres = false;
      const conteneurChiffresNonEspaces = uneQuestionNumerique().find('.numerique-input-conteneur');
      expect(conteneurChiffresNonEspaces.classes('chiffres-espaces')).to.be(false);
    });
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

  it('rapporte son ouverture au journal', function (done) {
    localVue.prototype.$journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementAffichageQuestionQCM);
      expect(evenement.donnees()).to.eql({ question: question.id });
      done();
    };
    shallowMount(VueQCM, { localVue, propsData: { question } });
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
