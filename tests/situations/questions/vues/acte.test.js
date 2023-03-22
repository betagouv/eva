import { mount } from '@vue/test-utils';

import { creeStore } from 'questions/modeles/store';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import Acte from 'questions/vues/acte';
import Defi from 'commun/vues/defi';

describe("La vue de l'acte « Question »", function () {
  let journal;
  let store;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', {
      questions: [
        { id: 1, type: 'redaction_note', nom_technique: 'question1' },
        { id: 2, type: 'qcm', choix: [{ id: 1, bonneReponse: true }], nom_technique: 'question2' }
      ]
    });
    journal = { enregistre () {} };
  });

  function composant (shallow = true) {
    return mount(Acte, {
      shallow: shallow,
      global: {
        plugins: [store],
        mocks: {
          $traduction: () => {},
          $journal: journal
        },
        stubs: {
          TransitionFade: false
        }
      }
    });
  }


  it('affiche la première question', function () {
    const vue = composant();

    expect(vue.findComponent(Defi).exists()).toBe(true);
  });

  it('enregistre la réponse dans le modèle lorsque la vue répond', function (done) {
    const vue = composant();
    store.commit = (mutation) => {
      expect(mutation).toEqual('repondQuestionCourante');
      done();
    };
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it('enregistre la réponse dans le journal', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementReponse);
      expect(evenement.donnees()).toEqual({ reponse: 'Ma réponse' });
      done();
    };
    const vue = composant();
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it("envoie l'événement terminer une fois toute les questions passées", function (done) {
    const vue = composant();
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
    const vue = composant();
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
    const vue = composant();
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.$nextTick(() => {
      expect(vue.findComponent(Defi).exists()).toBe(true);
      done();
    });
  });
});
