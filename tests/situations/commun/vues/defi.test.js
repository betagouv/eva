import { shallowMount, createLocalVue } from '@vue/test-utils';
import Defi from 'commun/vues/defi';
import Qcm from 'commun/vues/defi/qcm';
import QuestionEntete from 'commun/vues/question_entete';
import MockExtension from './mock_extension';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';
import { creeStore } from 'commun/modeles/store';
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import { DEMARRE } from 'commun/modeles/situation';

describe("La vue d'un défi", function () {
  let question;
  let localVue;
  let store;

  beforeEach(function () {
    store = creeStore();
    question = { id: 154, choix: [], nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    localVue.prototype.$traduction = () => {};
  });

  function composant (question) {
    return shallowMount(Defi, { localVue, store, propsData: { question } });
  }

  it("affiche l'entête de la question", function () {
    const vue = composant(question);

    expect(vue.findComponent(QuestionEntete).exists()).toBe(true);
  });

  describe('quand le défi est de type qcm', function () {
    let vue;

    beforeEach(function () {
      question.choix = [{ id: 'uid-32', bonneReponse: true }, { id: 'uid-32-2', bonneReponse: false }];
      question.type = 'qcm';
      vue = composant(question);
    });

    it('affiche le composant qcm', function () {
      expect(vue.findComponent(Qcm).exists()).toBe(true);
    });

    it('emet un événement réponse quand on appuie sur le bouton envoi', function (done) {
      const reponse = { reponse: 'uid-32', succes: true };
      vue.findComponent(Qcm).vm.$emit('input', reponse);
      vue.vm.$nextTick(() => {
        vue.find('.question-bouton').trigger('click');
        vue.vm.$nextTick(() => {
          expect(vue.emitted().reponse.length).toEqual(1);
          expect(vue.emitted().reponse[0][0]).toEqual(reponse);
          done();
        });
      });
    });
  });

  it("emet un événement réponse vide quand il n'y a pas de choix de réponse", function (done) {
    question.choix = [];
    const vue = composant(question);
    vue.find('.question-bouton').trigger('click');
    vue.vm.$nextTick(() => {
      expect(vue.emitted().reponse.length).toEqual(1);
      expect(vue.emitted().reponse[0][0]).toEqual('');
      done();
    });
  });

  describe('quand le defi est de type champ de saisie', function () {
    let vue;

    beforeEach(function () {
      question.type = 'champ-saisie';
      question.choix = undefined;
      question.bonneReponse = '1800';
      vue = composant(question);
    });

    it('affiche le composant champ de saisie', function () {
      expect(vue.findComponent(ChampSaisie).exists()).toBe(true);
    });

    it('quand les chiffres doivent être espacés', function () {
      question.espacerChiffres = true;
      vue = composant(question);
      expect(vue.findComponent(ChampSaisie).vm.question.espacerChiffres).toBe(true);
    });

    describe('#disabled', function () {
      it("désactive le bouton quand aucune réponse numérique n'est donnée", function () {
        expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
      });
    });
  });

  describe('quand le défi est de type action', function () {
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

  describe('quand le défi contient une extention', function () {
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

  describe("rapporte l'affichage d'une question au journal", function () {
    it("ne journalise pas l'affichage si aucun acte n'est en cours", function () {
      const journalEnregistre = jest.spyOn(localVue.prototype.$journal, 'enregistre');
      composant(question);

      expect(journalEnregistre).not.toHaveBeenCalled();
    });

    it('quand la situation est déja démarrée', function (done) {
      localVue.prototype.$journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
        expect(evenement.donnees()).toEqual({ question: question.id });
        done();
      };

      store.state.etat = DEMARRE;
      composant(question);
    });

    it('quand la situation démarre après coup', function (done) {
      localVue.prototype.$journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
        done();
      };

      composant(question);

      store.state.etat = DEMARRE;
    });

    it('quand il y a une métacompétence', function (done) {
      question.metacompetence = 'ma métacompétence';
      localVue.prototype.$journal.enregistre = (evenement) => {
        expect(evenement.donnees()).toEqual({ question: question.id, metacompetence: 'ma métacompétence' });
        done();
      };

      store.state.etat = DEMARRE;
      composant(question);
    });
  });

  describe('#disabled', function () {
    it("désactive le bouton lorsqu'aucune réponse n'est sélectionnée", function (done) {
      question.choix = [{ id: 'uid-32' }];
      question.type = 'qcm';
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
      vue.findComponent(Qcm).vm.$emit('input', 'uid-32');

      vue.vm.$nextTick(() => {
        expect(vue.find('.question-bouton').attributes('disabled')).toBe(undefined);
        done();
      });
    });

    it('désactive le bouton une fois cliqué pour éviter le double click', function (done) {
      question.choix = [{ id: 'uid-32' }];
      question.type = 'qcm';
      const vue = composant(question);
      vue.findComponent(Qcm).vm.$emit('input', 'uid-32');
      vue.vm.$nextTick(() => {
        vue.find('.question-bouton').trigger('click');
        vue.vm.$nextTick(() => {
          expect(vue.find('.question-bouton').attributes('disabled')).toEqual('disabled');
          done();
        });
      });
    });

    it("active le bouton quand il n'y a pas de choix", function () {
      question.choix = [];
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).not.toEqual('disabled');
    });
  });
});
