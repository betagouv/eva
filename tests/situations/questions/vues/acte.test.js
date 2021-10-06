import { shallowMount, createLocalVue, mount } from '@vue/test-utils';

import { creeStore } from 'questions/modeles/store';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import EvenementAffichageQuestionQCM from 'commun/modeles/evenement_affichage_question_qcm';
import Acte from 'questions/vues/acte';
import QuestionQcm from 'commun/vues/qcm';
import QuestionRedactionNote from 'questions/vues/redaction_note';
import BoutonLecture from 'commun/vues/bouton-lecture';
import { DEMARRE } from 'commun/modeles/situation';

describe("La vue de l'acte « Question »", function () {
  let journal;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', {
      questions: [
        { id: 1, type: 'redaction_note', nom_technique: 'question1' },
        { id: 2, type: 'qcm', choix: [{ id: 1, bonneReponse: true }], nom_technique: 'question2' }
      ]
    });
    journal = { enregistre () {} };
    localVue = createLocalVue();
    localVue.prototype.$journal = journal;
    localVue.prototype.$depotRessources = {
      illustrationQuestion: () => {
        return { src: 'chemin-illustration' };
      },
      existeMessageAudio: () => false
    };
  });

  it('affiche la première question', function () {
    const vue = shallowMount(Acte, { store, localVue });

    expect(vue.findComponent(QuestionRedactionNote).exists()).toBe(true);
    expect(vue.findComponent(BoutonLecture).exists()).toBe(false);
  });

  it('affiche le bouton lecture si il existe un son', function () {
    localVue.prototype.$depotRessources.existeMessageAudio = () => true;
    const vue = shallowMount(Acte, { store, localVue });

    expect(vue.findComponent(BoutonLecture).exists()).toBe(true);
  });

  it('enregistre la réponse dans le modèle lorsque la vue répond', function (done) {
    const vue = shallowMount(Acte, { store, localVue });
    store.commit = (mutation) => {
      expect(mutation).toEqual('repondQuestionCourante');
      done();
    };
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it('enregistre la réponse dans le journal', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementReponse);
      expect(evenement.donnees()).toEqual({ question: 1, reponse: 'Ma réponse' });
      done();
    };
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it("envoie l'événement terminer une fois toute les questions passées", function (done) {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.$nextTick(() => {
      expect(vue.emitted('terminer')).toBe(undefined);
      vue.vm.repondQuestion({ reponse: 'Ma réponse' });
      vue.vm.$nextTick(() => {
        expect(vue.emitted('terminer').length).toEqual(1);
        done();
      });
    });
  });

  it("ne renvoie pas l'événement terminer quand on reconfigure l'acte après avoir terminé l'entrainement", function (done) {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.$nextTick(() => {
      store.commit('configureActe', {
        questions: [{ id: 1, type: 'redaction_note', nom_technique: 'question_1' }]
      });
      vue.vm.$nextTick(() => {
        expect(vue.emitted('terminer').length).toEqual(1);
        done();
      });
    });
  });

  it('garde la dernière question affichée à la fin', function (done) {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.$nextTick(() => {
      expect(vue.findComponent(QuestionQcm).exists()).toBe(true);
      done();
    });
  });

  it("ne renvoie pas l'événement d'ouverture quand il garde la dernière question affichée", function (done) {
    localVue.prototype.$traduction = () => {};
    var nombreOuverture = 0;
    localVue.prototype.$journal.enregistre = (evenement) => {
      if (evenement instanceof EvenementAffichageQuestionQCM) {
        nombreOuverture++;
      }
    };
    store.commit('configureActe', {
      questions: [
        { id: 1, type: 'qcm', nom_technique: 'bienvenue_1' },
        { id: 2, type: 'qcm', nom_technique: 'bienvenue_2' }
      ]
    });
    const wrapper = mount(Acte, { store, localVue });
    store.state.etat = DEMARRE;
    wrapper.vm.$nextTick(() => {
      wrapper.vm.repondQuestion({ reponse: 'Ma réponse' });
      wrapper.vm.repondQuestion({ reponse: 'Ma réponse' });
      wrapper.vm.$nextTick(() => {
        expect(nombreOuverture).toEqual(2);
        done();
      });
    });
  });
});
