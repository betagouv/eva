import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'commun/modeles/store';
import VueQuestionEntete from 'commun/vues/question_entete';

describe('la vue du composant entête', function () {
  let question;
  let localVue;
  let store;
  let mockDemarreSon;
  let BoutonLectureStub;

  beforeEach(function () {
    mockDemarreSon = jest.fn();
    BoutonLectureStub = {
      name: 'BoutonLecture',
      template: '<span />',
      methods: {
        demarreSon: mockDemarreSon
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
    beforeEach(function() {
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
    });

    it("affiche le bouton lecture", function () {
      const vue = composant(question);
      expect(vue.findComponent(BoutonLectureStub).exists()).toBe(true);
    });
  });

  describe("quand il n'existe pas de son", function() {
    it("n'affiche pas le bouton lecture", function () {
      localVue.prototype.$depotRessources.existeMessageAudio = () => false;
      const vue = composant(question);
      expect(vue.findComponent(BoutonLectureStub).exists()).toBe(false);
    });
  });

  describe('#demarreSon', function (){
    it("ne démarre pas le son quand il n'y a pas de son pour la question", function () {
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSon).not.toHaveBeenCalled();
    });

    it("démarre le son quand il y a un son pour la question", function () {
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSon).toHaveBeenCalled();
    });
  });
});
