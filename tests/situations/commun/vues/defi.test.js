import { createLocalVue, mount } from '@vue/test-utils';
import Defi from 'commun/vues/defi';
import Qcm from 'commun/vues/defi/qcm';
import RedactionNote from 'commun/vues/defi/redaction_note';
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
    question = { id: 154, nom_technique: 'question1', intitule: 'quelle couleur ?'};
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      existeMessageAudio: () => false,
      existeMessageVideo: () => false
    };
    localVue.prototype.$journal = { enregistre () {} };
    localVue.prototype.$traduction = () => {};
  });

  function composant (question) {
    return mount(Defi, {
      localVue,
      store,
      propsData: { question }
    });
  }

  it("affiche l'entête de la question", function () {
    const vue = composant(question);

    expect(vue.findComponent(QuestionEntete).exists()).toBe(true);
  });

  describe('#texteBouton', function () {
    it("renvoie le texte 'valider'", function () {
      const vue = composant(question);
      expect(vue.vm.texteBouton).toEqual('defi.valider');
    });
  });

  describe('quand le défi est de type rédaction note', function () {
    let vue;

    beforeEach(function () {
      question.type = 'redaction_note';
      vue = composant(question);
    });

    it('affiche le composant rédaction note', function () {
      expect(vue.findComponent(RedactionNote).exists()).toBe(true);
    });
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
      const reponse = { question: 154, reponse: 'uid-32', succes: true };
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
    question.type= 'qcm';
    const vue = composant(question);
    vue.find('.question-bouton').trigger('click');
    vue.vm.$nextTick(() => {
      expect(vue.emitted().reponse.length).toEqual(1);
      expect(vue.emitted().reponse[0][0]).toEqual({ question: 154 });
      done();
    });
  });

  it("emet la métacompétence quand il y en a une sur la question", function (done) {
    question.type= 'qcm';
    question.metacompetence = 'lecture';
    const vue = composant(question);
    vue.find('.question-bouton').trigger('click');
    vue.vm.$nextTick(() => {
      expect(vue.emitted().reponse.length).toEqual(1);
      expect(vue.emitted().reponse[0][0]).toEqual({ question: 154, metacompetence: 'lecture' });
      done();
    });
  });

  describe('quand le defi est de type champ de saisie', function () {
    let vue;

    beforeEach(function () {
      question.type = 'champ-saisie';
      question.choix = undefined;
      question.reponse = { texte: '1800' };
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
    let vue;

    beforeEach(function () {
      question.type = 'action';
      localVue.component('mock-extension', MockExtension);
      question.extensionVue = 'mock-extension';
      vue = composant(question);
    });

    it("n'affiche pas le bouton 'valider'", function () {
      const conteneur = vue.find('.question-bouton');
      expect(conteneur.exists()).toBe(false);
    });

    it("n'a pas de composant contenu", function () {
      expect(vue.vm.composantContenu).not.toBeDefined();
    });

    it('émet un évenement réponse réussi quand une extention envoie un evenement action', function () {
      vue.findComponent(MockExtension).vm.$emit('action');
      expect(vue.emitted().reponse.length).toEqual(1);

      expect(vue.emitted().reponse[0][0]).toEqual({ question: 154, succes: true });
    });
  });

  describe('quand le défi est de type sous consigne', function () {
    let vue;

    beforeEach(function () {
      question.type = 'sous-consigne';
      vue = composant(question);
    });

    it("n'a pas de composant contenu", function () {
      expect(vue.vm.composantContenu).not.toBeDefined();
    });

    describe('#texteBouton', function () {
      it("renvoie le texte 'suivant'", function () {
        expect(vue.vm.texteBouton).toEqual('defi.suivant');
      });
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
        expect(vue.find('.question-bouton').attributes('disabled')).not.toBeDefined();
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
      question.type = 'qcm';
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).not.toEqual('disabled');
    });
  });

  describe('#demarreSon', function() {
    let vue;
    let composantEnteteQuestion;

    beforeEach(function () {
      vue = composant(question);
      composantEnteteQuestion = vue.findComponent(QuestionEntete);
      composantEnteteQuestion.vm.demarreSon = jest.fn();
    });

    describe("quand l'acte est en cours", function() {
      it("démarre la lecture du son de l'entête question", function() {
        store.state.etat = DEMARRE;
        vue.vm.demarreSon();
        expect(composantEnteteQuestion.vm.demarreSon).toHaveBeenCalled();
      });
    });

    describe("quand l'acte n'est pas en cours", function() {
      it("Ne démarre pas la lecture du son de l'entête question", function() {
        vue.vm.demarreSon();
        expect(composantEnteteQuestion.vm.demarreSon).not.toHaveBeenCalled();
      });
    });
  });
});
