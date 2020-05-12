import { creeStore } from 'questions/modeles/store';

describe('Le store de la situation questions', function () {
  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.state.questions.length).to.eql(1);
  });

  it("réinitialise l'index des questions et l'état non fini à la configuration d'un acte", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    store.commit('repondQuestionCourante', 'reponse');
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.state.indexQuestions).to.eql(0);
    expect(store.state.fini).to.eql(false);
  });

  it('renvoit le nombre de questions', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.getters.nombreQuestions).to.eql(1);
  });

  it('retourne la question courante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }, { id: 2 }] });
    expect(store.getters.questionCourante).to.eql({ id: 1 });
  });

  it('permet de répondre a une question et de changer la question courante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }, { id: 2 }] });
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.getters.questionCourante).to.eql({ id: 2 });
  });

  it('une fois toute les questions passées, on garde la dernière question comme questionCourante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.getters.questionCourante).to.eql({ id: 1 });
  });

  it("dit que c'est fini quand toutes les questions ont été répondues", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 'question1' }, { id: 'question2' }] });
    expect(store.state.fini).to.be(false);
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.state.fini).to.be(false);
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.state.fini).to.be(true);
  });
});
