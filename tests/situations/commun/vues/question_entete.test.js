import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'commun/modeles/store';
import VueQuestionEntete from 'commun/vues/question_entete';
import { CHARGEMENT, DEMARRE, FINI } from 'commun/modeles/situation';

describe('la vue du composant entête', function () {
  let question;
  let localVue;
  let store;
  let mockDemareSon;
  let mockCoupeSon;
  let BoutonLectureStub;

  beforeEach(function () {
    mockDemareSon = jest.fn();
    mockCoupeSon = jest.fn();
    BoutonLectureStub = {
      name: 'BoutonLecture',
      template: '<span />',
      methods: {
        demarreSon: mockDemareSon,
        coupeSon: mockCoupeSon
      }
    };
    store = creeStore();
    question = { id: 154, choix: [], nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      existeMessageAudio: () => false
    };
  });

  function composant(question) {
    return shallowMount(VueQuestionEntete, {
      localVue,
      store,
      propsData: { question },
      stubs: {
        'bouton-lecture': BoutonLectureStub
      }
    });
  }

  describe('quand il existe un son', function() {
    let vue;

    beforeEach(function() {
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
    });

    it("affiche le bouton lecture", function () {
      vue = composant(question);
      expect(vue.findComponent(BoutonLectureStub).exists()).toBe(true);
    });

    it("joue le son à l'ouverture si l'acte est démarré", function () {
      store.state.etat = DEMARRE;
      vue = composant(question);
      expect(mockDemareSon).toHaveBeenCalled();
    });

    it("joue le son quand l'acte démarre", function (done) {
      store.state.etat = CHARGEMENT;
      vue = composant(question);
      expect(mockDemareSon).toHaveBeenCalledTimes(0);
      store.commit('modifieEtat', DEMARRE);
      vue.vm.$nextTick(() => {
        expect(mockDemareSon).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('coupe le son si la situation est terminée', function (done) {
      store.state.etat = DEMARRE;
      vue = composant(question);
      store.commit('modifieEtat', FINI);
      vue.vm.$nextTick(() => {
        expect(mockCoupeSon).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe("quand il n'existe pas de son", function() {
    let vue;

    beforeEach(function() {
      localVue.prototype.$depotRessources.existeMessageAudio = () => false;
    });

    it("n'affiche pas le bouton lecture", function () {
      vue = composant(question);
      expect(vue.findComponent(BoutonLectureStub).exists()).toBe(false);
    });

    it('ne coupe pas le son si la situation est terminée', function (done) {
      store.state.etat = DEMARRE;
      vue = composant(question);
      store.commit('modifieEtat', FINI);
      vue.vm.$nextTick(() => {
        expect(mockCoupeSon).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
