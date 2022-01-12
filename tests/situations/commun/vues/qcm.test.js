import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQCM from 'commun/vues/qcm';
import ReponseAudioQcm from 'commun/vues/reponse_audio_qcm';
import QuestionEntete from 'commun/vues/question_entete';
import MockExtension from './mock_extension';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';

describe('La vue de la question QCM', function () {
  let question;
  let localVue;

  beforeEach(function () {
    question = { id: 154, choix: [], nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = {
      reponseAudio: () => {
        return 'chemin de la ressource';
      },
      existeMessageAudio: () => false
    };
  });

  function composant (question) {
    return shallowMount(VueQCM, { localVue, propsData: { question } });
  }

  it("affiche l'entête de la question", function () {
    const vue = composant(question);

    expect(vue.findComponent(QuestionEntete).exists()).toBe(true);
  });

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const vue = composant(question);
    expect(vue.findAll('input[type=radio]').length).toBe(5);
  });

  it('affiche un control audio sur chaque réponse', function () {
    question.choix = [{ audio: '1' }, { audio: '1' }, { audio: '1' }];
    const vue = composant(question);
    expect(vue.findAllComponents(ReponseAudioQcm).length).toBe(3);
  });

  it('affiche une image sur chaque réponse', function () {
    question.choix = [{ image: '1' }, { image: '1' }, { image: '1' }];
    const vue = composant(question);
    expect(vue.findAll('img').length).toBe(3);
  });

  describe('quand la question est de type numérique', function () {
    let vue;

    beforeEach(function () {
      question.type = 'numerique';
      question.choix = undefined;
      question.bonneReponse = '1800';
      vue = composant(question);
    });

    it('affiche un champ numérique', function () {
      const inputNumerique = vue.findAll('input[type=text]');
      expect(inputNumerique.length).toBe(1);
      expect(inputNumerique.at(0).classes('input-numerique')).toBe(true);
    });

    describe('quand les chiffres doivent être espacés', function () {
      beforeEach(function () {
        question.espacerChiffres = true;
        vue = composant(question);
      });

      it('ajoute la classe css', function () {
        const conteneur = vue.find('.input-numerique-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(true);
      });
    });

    describe('quand les chiffres ne doivent pas être espacés', function () {
      beforeEach(function () {
        question.espacerChiffres = false;
      });

      it("n'ajoute pas de classe css", function () {
        const conteneur = vue.find('.input-numerique-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(false);
      });
    });

    it('émet un évement réponse', function () {
      vue.vm.reponse = '1800';
      vue.vm.envoi();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: '1800', succes: true });
    });

    describe('#disabled', function () {
      it("désactive le bouton quand aucune réponse numérique n'est donnée", function () {
        expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
      });
    });
  });

  describe('quand la question est de type action', function () {
    beforeEach(function () {
      question.type = 'action';
      localVue.component('mock-extension', MockExtension);
      question.extensionVue = 'mock-extension';
    });

    it("n'affiche pas le bouton 'valider'", function () {
      const conteneur = composant(question).find('.question-bouton');
      expect(conteneur.exists()).toBe(false);
    });

    it('émet un évenement réponse réussi quand une extention envoie un evenement action', function () {
      const vue = composant(question);
      vue.findComponent(MockExtension).vm.$emit('action');
      expect(vue.emitted().reponse.length).toEqual(1);
      expect(vue.emitted().reponse[0][0]).toEqual({ succes: true });
    });
  });

  describe('quand la question contient une extention', function () {
    beforeEach(function () {
      localVue.component('mock-extension', MockExtension);
      question.extensionVue = 'mock-extension';
    });

    it("sait afficher l'extention", function () {
      const vue = composant(question);
      expect(vue.findComponent(MockExtension).exists()).toBe(true);
    });
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = composant(question);
    expect(vue.find('.question-bouton').exists()).toBe(true);
  });

  it('rapporte son ouverture au journal', function (done) {
    question.metacompetence = 'ma métacompétence';
    localVue.prototype.$journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
      expect(evenement.donnees()).toEqual({ question: question.id, metacompetence: 'ma métacompétence' });
      done();
    };
    composant(question);
  });

  it('emet un événement réponse quand on appuie sur le bouton envoi', function (done) {
    question.choix = [{ id: 'uid-32', bonneReponse: true }];
    const vue = composant(question);
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

  it("emet un événement réponse vide quand il n'y a pas de choix de réponse", function (done) {
    question.choix = [];
    const vue = composant(question);
    vue.find('.question-bouton').trigger('click');
    vue.vm.$nextTick(() => {
      expect(vue.emitted().reponse.length).toEqual(1);
      expect(vue.emitted().reponse[0][0]).toEqual({ succes: true });
      done();
    });
  });

  describe('#disabled', function () {
    it("désactive le bouton lorsqu'aucune réponse n'est sélectionnée", function (done) {
      question.choix = [{ id: 'uid-32' }];
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');

      vue.find('input[type=radio][value=uid-32]').setChecked();
      vue.vm.$nextTick(() => {
        expect(vue.find('.question-bouton').attributes('disabled')).toBe(undefined);
        done();
      });
    });

    it('désactive le bouton une fois répondu pour éviter le double click', function () {
      question.choix = [{ id: 'uid-32' }];
      const vue = composant(question);
      vue.find('input[type=radio][value=uid-32]').setChecked();
      vue.find('.question-bouton').trigger('click');
      expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
    });

    it("active le bouton quand il n'y a pas de choix", function () {
      question.choix = [];
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).not.toEqual('disabled');
    });
  });
});
