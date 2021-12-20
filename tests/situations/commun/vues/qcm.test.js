import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQCM from 'commun/vues/qcm';
import ReponseAudioQcm from 'commun/vues/reponse_audio_qcm';
import QuestionEntete from 'commun/vues/question_entete';
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
    beforeEach(function () {
      question.type = 'numerique';
    });

    it('affiche un champ numérique', function () {
      const inputNumerique = composant(question).findAll('input[type=text]');
      expect(inputNumerique.length).toBe(1);
      expect(inputNumerique.at(0).classes('numerique-input')).toBe(true);
    });

    describe('quand les chiffres doivent être espacés', function () {
      beforeEach(function () {
        question.espacerChiffres = true;
      });

      it('ajoute la classe css', function () {
        const conteneur = composant(question).find('.numerique-input-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(true);
      });
    });

    describe('quand les chiffres ne doivent pas être espacés', function () {
      beforeEach(function () {
        question.espacerChiffres = false;
      });

      it("n'ajoute pas de classe css", function () {
        const conteneur = composant(question).find('.numerique-input-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(false);
      });
    });

    it('émet un évement réponse', function () {
      question.bonneReponse = '1800';
      const vue = composant(question);
      vue.vm.reponse = '1800';
      vue.vm.envoi();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: '1800', succes: true });
    });
  });

  describe('quand la question est de type action', function () {
    beforeEach(function () {
      question.type = 'action';
    });

    it("n'affiche pas le bouton 'valider'", function () {
      const conteneur = composant(question).find('.question-bouton');
      expect(conteneur.exists()).toBe(false);
    });
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const vue = composant(question);
    expect(vue.find('.question-bouton').exists()).toBe(true);
  });

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

  it('désactive le bouton une fois répondu pour éviter le double click', function () {
    question.choix = [{ id: 'uid-32' }];
    const vue = composant(question);
    vue.find('input[type=radio][value=uid-32]').setChecked();
    vue.find('.question-bouton').trigger('click');
    expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
  });
});
