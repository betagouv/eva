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
    expect(vue.findAll('input[type=radio]').length).toBe(5);
  });

  it('affiche un control audio sur chaque réponse', function () {
    question.choix = [{ audio: '1' }, { audio: '1' }, { audio: '1' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAllComponents(LecteurAudio).length).toBe(3);
  });

  it('affiche une image sur chaque réponse', function () {
    question.choix = [{ image: '1' }, { image: '1' }, { image: '1' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.findAll('img').length).toBe(3);
  });

  describe('affiche une question de type numérique', function () {
    function uneQuestionNumerique () {
      question.numerique = true;
      return shallowMount(VueQCM, { localVue, propsData: { question } });
    }

    it('affiche un champ numérique', function () {
      const inputNumerique = uneQuestionNumerique().findAll('input[type=text]');
      expect(inputNumerique.length).toBe(1);
      expect(inputNumerique.at(0).classes('numerique-input')).toBe(true);
    });

    it("Sait espacer les chiffres dans l'input pour les question de type numérique", function () {
      question.espacerChiffres = true;
      const conteneurChiffresEspaces = uneQuestionNumerique().find('.numerique-input-conteneur');
      expect(conteneurChiffresEspaces.classes('chiffres-espaces')).toBe(true);
    });

    it("Sait espacer les chiffres dans l'input pour les question de type numérique", function () {
      question.espacerChiffres = false;
      const conteneurChiffresNonEspaces = uneQuestionNumerique().find('.numerique-input-conteneur');
      expect(conteneurChiffresNonEspaces.classes('chiffres-espaces')).toBe(false);
    });
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.find('.question-bouton').exists()).toBe(true);
  });

  it("désactive le bouton lorsqu'aucune réponse n'est sélectionnée", function (done) {
    question.choix = [{ id: 'uid-32' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');

    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.vm.$nextTick(() => {
      expect(vue.find('.question-bouton').attributes('disabled')).toBe(undefined);
      done();
    });
  });

  it('rapporte son ouverture au journal', function (done) {
    question.metacompetence = 'ma métacompétence';
    localVue.prototype.$journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
      expect(evenement.donnees()).toEqual({ question: question.id, metacompetence: 'ma métacompétence' });
      done();
    };
    shallowMount(VueQCM, { localVue, propsData: { question } });
  });

  it('emet un événement réponse quand on appuie sur le bouton envoi', function (done) {
    question.choix = [{ id: 'uid-32', bonneReponse: true }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.vm.$nextTick(() => {
      vue.find('.question-bouton').trigger('click');
      vue.vm.$nextTick(() => {
        expect(vue.emitted().reponse.length).toEqual(1);
        expect(vue.emitted().reponse[0][0]).toEqual({ reponse: 'uid-32', succes: true });
        done();
      });
    });
  });

  it('émet un évement réponse pour une question numérique', function () {
    question.numerique = true;
    question.bonneReponse = '1800';
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    vue.vm.reponse = '1800';
    vue.vm.envoi();
    expect(vue.emitted('reponse').length).toEqual(1);
    expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: '1800', succes: true });
  });

  it('désactive le bouton une fois répondu pour éviter le double click', function () {
    question.choix = [{ id: 'uid-32' }];
    const vue = shallowMount(VueQCM, { localVue, propsData: { question } });
    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.find('.question-bouton').trigger('click');
    expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
  });
});
