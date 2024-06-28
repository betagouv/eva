import { mount } from '@vue/test-utils';
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
  let store;
  let depotRessources;
  let journal;

  beforeEach(function () {
    store = creeStore();
    question = { id: 154, nom_technique: 'question1', intitule: 'quelle couleur ?' };
    depotRessources = {
      illustrationQuestion: () => { return {}; },
      existeMessageAudio: () => false,
      existeMessageVideo: () => false
    };
    journal = { enregistre: () => {} };
  });

  function composant (question) {
    return mount(Defi, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources,
          $traduction: () => {},
          $journal: journal
        },
        stubs: {
          MockExtension: MockExtension
        }
      },
      props: { question }
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

  describe('quand le défit est de type saisie', function () {
    beforeEach(function () {
      question.type = 'saisie';
    });

    describe('rédaction', function () {
      beforeEach(function () {
        question.sous_type = 'redaction';
      });

      it('affiche le composant rédaction note', function () {
        expect(composant(question).findComponent(RedactionNote).exists()).toBe(true);
      });
    });

    describe('numerique', function () {
      beforeEach(function () {
        question.sous_type = 'numerique';
      });

      it('affiche le composant champ de saisie', function () {
        expect(composant(question).findComponent(ChampSaisie).exists()).toBe(true);
      });
    });
  });

  describe('quand le défi est de type qcm', function () {
    let vue;

    beforeEach(function () {
      question.choix = [
        { id: 'uid-32', bonneReponse: true, score: 1 },
        { id: 'uid-32-2', bonneReponse: false }
      ];
      question.type = 'qcm';
      vue = composant(question);
    });

    it('affiche le composant qcm', function () {
      expect(vue.findComponent(Qcm).exists()).toBe(true);
    });

    it('emet un événement réponse quand on appuie sur le bouton envoi', function (done) {
      const reponse = {
        question: question.id,
        intitule: question.intitule,
        metacompetence: undefined,
        scoreMax: 1,
        reponse: 'uid-32',
        succes: true
      };
      vue.findComponent(Qcm).vm.$emit('reponse', reponse);
      vue.vm.$nextTick(() => {
        vue.find('.question-bouton').trigger('click');
        vue.vm.$nextTick(() => {
          expect(vue.vm.envoyer).toBe(true);
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
      expect(vue.emitted().reponse[0][0]).toEqual({
        question: 154,
        intitule: "quelle couleur ?",
        metacompetence: undefined,
        scoreMax: undefined,
      });
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
      expect(vue.emitted().reponse[0][0]).toEqual({
        question: 154,
        intitule: "quelle couleur ?",
        metacompetence: 'lecture',
        scoreMax: undefined,
      });
      done();
    });
  });

  describe('quand le defi est de type saisie', function () {
    let vue;

    beforeEach(function () {
      question.type = 'saisie';
      vue = composant(question);
    });

    describe('#disabled', function () {
      it("désactive le bouton quand aucune réponse n'est donnée", function () {
        expect(vue.find('.question-bouton').attributes('disabled')).toEqual('');
      });
    });
  });

  describe('quand le defi est de type champ de saisie', function () {
    let vue;

    beforeEach(function () {
      question.type = 'saisie';
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
        expect(vue.find('.question-bouton').attributes('disabled')).toEqual('');
      });
    });
  });

  describe('quand le défi est de type action', function () {
    let vue;

    beforeEach(function () {
      question.type = 'action';
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

      expect(vue.emitted().reponse[0][0]).toEqual({
        question: 154,
        intitule: "quelle couleur ?",
        metacompetence: undefined,
        scoreMax: undefined,
        succes: true
      });
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
      const journalEnregistre = jest.spyOn(journal, 'enregistre');
      composant(question);

      expect(journalEnregistre).not.toHaveBeenCalled();
    });

    it('quand la situation est déja démarrée', function (done) {
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
        expect(evenement.donnees()).toEqual({ question: question.id });
        done();
      };

      store.state.etat = DEMARRE;
      composant(question);
    });

    it('quand la situation démarre après coup', function (done) {
      journal.enregistre = (evenement) => {
        expect(evenement).toBeInstanceOf(EvenementAffichageQuestionQCM);
        done();
      };

      composant(question);

      store.state.etat = DEMARRE;
    });

    it('quand il y a une métacompétence', function (done) {
      question.metacompetence = 'ma métacompétence';
      journal.enregistre = (evenement) => {
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
      expect(vue.find('.question-bouton').attributes('disabled')).toEqual('');
      vue.findComponent(Qcm).vm.$emit('reponse', 'uid-32');

      vue.vm.$nextTick(() => {
        expect(vue.find('.question-bouton').attributes('disabled')).not.toBeDefined();
        done();
      });
    });

    it('désactive le bouton une fois cliqué pour éviter le double click', function (done) {
      question.choix = [{ id: 'uid-32' }];
      question.type = 'qcm';
      const vue = composant(question);
      vue.findComponent(Qcm).vm.$emit('reponse', 'uid-32');
      vue.vm.$nextTick(() => {
        vue.find('.question-bouton').trigger('click');
        vue.vm.$nextTick(() => {
          expect(vue.find('.question-bouton').attributes('disabled')).toEqual('');
          done();
        });
      });
    });

    it("active le bouton quand il n'y a pas de choix", function () {
      question.choix = [];
      question.type = 'qcm';
      const vue = composant(question);
      expect(vue.find('.question-bouton').attributes('disabled')).not.toEqual('');
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

  describe('#scoreMax', function () {
    describe('quand la question contient une réponse avec une liste de score', function () {
      beforeEach(function () {
        question.reponse = {
          nom_technique: 'APlc/cuisine',
          textes: ['cuisine', 'cuisines'],
          scores: [1, 0.75]
        };
        question.choix = undefined;
      });

      it("retourne le score le plus élevé", function () {
        const vue = composant(question);
        expect(vue.vm.scoreMax()).toEqual(1);
      });
    });

    describe('quand la question contient une réponse avec un score', function () {
      beforeEach(function () {
        question.reponse =  {
          texte: 'Exercice',
          nom_technique: 'ALrd/exercice',
          score: 1
        };
        question.choix = undefined;
      });

      it("retourne le score", function () {
        const vue = composant(question);
        expect(vue.vm.scoreMax()).toEqual(1);
      });
    });

    describe('quand la question contient des choix', function () {
      beforeEach(function () {
        question.reponse =  undefined;
        question.choix = [
          {
            id: 'bax',
            nom_technique: 'ALrd/bax',
            bonneReponse: false
          },
          {
            id: 'max',
            nom_technique: 'ALrd/max',
            score: 1,
            bonneReponse: true
          }
        ];
      });

      it("retourne le score", function () {
        const vue = composant(question);
        expect(vue.vm.scoreMax()).toEqual(1);
      });
    });

    describe('quand la question contient des choix sans aucun score', function () {
      beforeEach(function () {
        question.reponse =  undefined;
        question.choix = [
          {
            id: 'bax',
            nom_technique: 'ALrd/bax',
            bonneReponse: false
          },
          {
            id: 'max',
            nom_technique: 'ALrd/max',
            bonneReponse: true
          }
        ];
      });

      it("retourne le score", function () {
        const vue = composant(question);
        expect(vue.vm.scoreMax()).toEqual(undefined);
      });
    });
  });

  describe('#reponseIntitule', function() {
    let vue;

    beforeEach(function () {
      question.type = 'saisie';
      vue = composant(question);
    });

    describe("quand il n'y a pas d'intitulé", function () {
      it("retourne undefined", function () {
        expect(vue.vm.reponseIntitule()).toEqual(undefined);
      });
    });

    describe("quand il y a une retranscription audio", function () {
      beforeEach(function () {
        question.choix = [
          {
            id: 'tempsPresent',
            nom_technique: 'ACrd/le_temps_present',
            bonneReponse: false,
            retranscription_audio: 'Le temps présent'
          },
          {
            id: 'tempsFutur',
            nom_technique: 'ACrd/le_temps_futur',
            bonneReponse: true,
            score: 1,
            retranscription_audio: 'Le temps futur'
          },
          {
            id: 'tempsPasse',
            nom_technique: 'ACrd/le_temps_passe',
            bonneReponse: false,
            retranscription_audio: 'Le temps passé'
          }
        ];
        vue = composant(question);
        const reponse = 'tempsFutur';
        vue.vm.attribueReponse(reponse);
      });

      it("retourne l'intitulé Le temps futur »", function () {
        expect(vue.vm.reponseIntitule()).toEqual('Le temps futur');
      });
    });
  });
});
