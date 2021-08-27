import { creeStore } from 'questions/modeles/store';

describe('Le store de la situation questions', function () {
  it("permet la configuration d'un acte", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.state.questions.length).toEqual(1);
  });

  it("réinitialise l'index des questions et l'état non fini à la configuration d'un acte", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    store.commit('repondQuestionCourante', 'reponse');
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.state.indexQuestions).toEqual(0);
    expect(store.state.fini).toEqual(false);
  });

  it('renvoit le nombre de questions', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    expect(store.getters.nombreQuestions).toEqual(1);
  });

  it('retourne la question courante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }, { id: 2 }] });
    expect(store.getters.questionCourante).toEqual({ id: 1 });
  });

  it('permet de répondre a une question et de changer la question courante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }, { id: 2 }] });
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.getters.questionCourante).toEqual({ id: 2 });
  });

  it('une fois toute les questions passées, on garde la dernière question comme questionCourante', function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 1 }] });
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.getters.questionCourante).toEqual({ id: 1 });
  });

  it("dit que c'est fini quand toutes les questions ont été répondues", function () {
    const store = creeStore();
    store.commit('configureActe', { questions: [{ id: 'question1' }, { id: 'question2' }] });
    expect(store.state.fini).toBe(false);
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.state.fini).toBe(false);
    store.commit('repondQuestionCourante', 'reponse');
    expect(store.state.fini).toBe(true);
  });

  it("Retourne l'illustration d'une question", function () {
    const store = creeStore();
    expect(store.getters.illustrationQuestion({ nom_technique: 'bienvenue_1' }))
      .toEqual('bienvenue_background.jpg');
  });

  it("Retourne une erreur si une question n'a pas d'illustration", function () {
    const store = creeStore();
    expect(() => {
      store.getters.illustrationQuestion({ id: 'id1', nom_technique: 'inconnu' });
    })
      .toThrow('La question id1 avec le nom technique "inconnu" ne possède pas d\'illustration');
  });

  it("Retourne une erreur si une question n'a pas de nom technique", function () {
    const store = creeStore();
    expect(() => {
      store.getters.illustrationQuestion({ id: 'id1' });
    })
      .toThrow('La question id1 avec le nom technique "undefined" ne possède pas d\'illustration');
  });
});
