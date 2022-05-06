import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'commun/modeles/store';
import VueQuestionEntete from 'commun/vues/question_entete';

describe('la vue du composant entête', function () {
  let question;
  let localVue;
  let store;
  let mockDemarreSonTexteEntete;
  let mockDemarreSonQuestionAudio;
  let callbackFinQuestionAudio;

  beforeEach(function () {
    store = creeStore();
    question = { id: 154, choix: [], nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = {
      existeMessageAudio: () => false
    };
  });

  function composant(question) {
    const composant = shallowMount(VueQuestionEntete, {
      localVue,
      store,
      propsData: { question }
    });
    mockDemarreSonTexteEntete = jest.fn();
    mockDemarreSonQuestionAudio = jest.fn((cb) => { callbackFinQuestionAudio = cb; });
    if(composant.vm.$refs.boutonLectureTexteEntete)
      composant.vm.$refs.boutonLectureTexteEntete.demarreSon = mockDemarreSonTexteEntete;
    if(composant.vm.$refs.boutonLectureQuestionAudio)
      composant.vm.$refs.boutonLectureQuestionAudio.demarreSon = mockDemarreSonQuestionAudio;
    return composant;
  }

  describe('#afficheLectureTexteEntete', function () {
    it("Quand la question à un son, affiche le bouton lecture texte entete", function () {
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      expect(vue.vm.afficheLectureTexteEntete).toBe(true);
      expect(vue.vm.$refs.boutonLectureTexteEntete).toBeDefined();
    });

    it("Quand la question n'a pas de son, n'affiche pas le bouton lecture texte entete", function () {
      localVue.prototype.$depotRessources.existeMessageAudio = () => false;
      const vue = composant(question);
      expect(vue.vm.afficheLectureTexteEntete).toBe(false);
      expect(vue.vm.$refs.boutonLectureTexteEntete).not.toBeDefined();
    });
  });

  describe('#afficheLectureQuestionAudio', function () {
    beforeEach(function () {
      localVue.prototype.$depotRessources.existeMessageAudio =
        (nom_technique) => nom_technique == 'cuisine';
    });

    it('affiche un bouton lecture lorsque la réponse a un audio associé', function () {
      const vue = composant({ reponse: { nom_technique: 'cuisine' } });
      expect(vue.vm.afficheLectureQuestionAudio).toBe(true);
      expect(vue.vm.$refs.boutonLectureQuestionAudio).toBeDefined();
    });

    it("n'affiche pas de bouton lecture lorsque la réponse n'a pas d'audio associé", function () {
      const vue = composant({ reponse: { } });
      expect(vue.vm.afficheLectureQuestionAudio).toBe(false);
      expect(vue.vm.$refs.boutonLectureQuestionAudio).not.toBeDefined();
    });
  });

  describe('#demarreSon', function (){
    it("démarre le son quand il y a une question audio uniquement", function () {
      const question = {
        reponse: { nom_technique: 'reponse1'}
      };
      localVue.prototype.$depotRessources.existeMessageAudio =
        (nom_technique) => nom_technique == 'reponse1';
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSonQuestionAudio).toHaveBeenCalled();
      expect(mockDemarreSonTexteEntete).not.toHaveBeenCalled();
      callbackFinQuestionAudio();
      expect(mockDemarreSonTexteEntete).not.toHaveBeenCalled();
    });

    it("enchaîne le son de la question audio puis celui du son du texte entête quand il y a des sons", function () {
      const question = {
        nom_technique: 'question1',
        reponse: { nom_technique: 'reponse1'}
      };
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSonQuestionAudio).toHaveBeenCalled();
      expect(mockDemarreSonTexteEntete).not.toHaveBeenCalled();
      callbackFinQuestionAudio();
      expect(mockDemarreSonTexteEntete).toHaveBeenCalled();
    });

    it("ne démarre pas le son quand il n'y a aucun son", function () {
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSonQuestionAudio).not.toHaveBeenCalled();
      expect(mockDemarreSonTexteEntete).not.toHaveBeenCalled();
    });

    it("démarre le son quand il y a une question écrite uniquement", function () {
      localVue.prototype.$depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSonQuestionAudio).not.toHaveBeenCalled();
      expect(mockDemarreSonTexteEntete).toHaveBeenCalled();
    });
  });
});
