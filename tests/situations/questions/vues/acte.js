import { shallowMount, createLocalVue } from '@vue/test-utils';

import { creeStore } from 'questions/modeles/store';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import Acte from 'questions/vues/acte';
import QuestionQcm from 'commun/vues/qcm';
import QuestionRedactionNote from 'questions/vues/redaction_note';

describe("La vue de l'acte « Question »", function () {
  let journal;
  let store;
  let localVue;

  beforeEach(function () {
    store = creeStore();
    store.commit('configureActe', {
      questions: [
        { id: 1, type: 'redaction_note' },
        { id: 2, type: 'qcm', choix: [{ id: 1, bonneReponse: true }] }
      ]
    });
    journal = { enregistre () {} };
    localVue = createLocalVue();
    localVue.prototype.$journal = journal;
  });

  it('affiche la première question', function () {
    const vue = shallowMount(Acte, { store });

    expect(vue.contains(QuestionRedactionNote)).to.be(true);
  });

  it('enregistre la réponse dans le modèle lorsque la vue répond', function (done) {
    const vue = shallowMount(Acte, { store, localVue });
    store.commit = (mutation) => {
      expect(mutation).to.eql('repondQuestionCourante');
      done();
    };
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it('enregistre la réponse dans le journal', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementReponse);
      expect(evenement.donnees()).to.eql({ question: 1, reponse: 'Ma réponse' });
      done();
    };
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
  });

  it("envoie l'événement terminer une fois toute les questions passées", function () {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    expect(vue.emitted('terminer')).to.be(undefined);
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    expect(vue.emitted('terminer').length).to.eql(1);
  });

  it("ne renvoie pas l'événement terminer quand on reconfigure l'acte après avoir terminé l'entrainement", function () {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    store.commit('configureActe', {
      questions: [{ id: 1, type: 'redaction_note' }]
    });
    expect(vue.emitted('terminer').length).to.eql(1);
  });

  it('garde la dernière question affichée à la fin', function () {
    const vue = shallowMount(Acte, { store, localVue });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    vue.vm.repondQuestion({ reponse: 'Ma réponse' });
    expect(vue.contains(QuestionQcm)).to.be(true);
  });
});
