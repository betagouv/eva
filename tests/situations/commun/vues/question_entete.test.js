import { shallowMount } from '@vue/test-utils';
import { creeStore } from 'commun/modeles/store';
import VueQuestionEntete from 'commun/vues/question_entete';

describe('la vue du composant entête', function () {
  let question;
  let depotRessources;
  let store;
  let mockDemarreSonTexteEntete;
  let mockDemarreSonQuestionAudio;
  let callbackFinQuestionAudio;

  beforeEach(function () {
    store = creeStore();
    question = { id: 154, choix: [], nom_technique: 'question1' };
    depotRessources = {
      existeMessageAudio: () => false
    };
  });

  function composant(question) {
    const composant = shallowMount(VueQuestionEntete, {
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: depotRessources
        }
      },
      props: { question }
    });
    mockDemarreSonTexteEntete = jest.fn();
    mockDemarreSonQuestionAudio = jest.fn((cb) => { callbackFinQuestionAudio = cb; });
    if(composant.vm.$refs.boutonLectureTexteEntete)
      composant.vm.$refs.boutonLectureTexteEntete.demarreSon = mockDemarreSonTexteEntete;
    if(composant.vm.$refs.boutonLectureQuestionAudio)
      composant.vm.$refs.boutonLectureQuestionAudio.demarreSon = mockDemarreSonQuestionAudio;
    return composant;
  }

  describe('#intitule_markdownifie', function () {
    it("affiche le libellé en markdown", function() {
      question.intitule = "**intitulé en gras**";
      const vue = composant(question);
      const htmlAttendu = '<p><strong>intitulé en gras</strong></p>';

      expect(vue.vm.intitule_markdownifie.trim()).toEqual(htmlAttendu);
    });

    it("remplace les sauts de ligne \n par un <br>", function() {
      question.intitule = "18 h 55\n« Les livres ont la parole ».";
      const vue = composant(question);
      const htmlAttendu = '<p>18 h 55<br>« Les livres ont la parole ».</p>';

      expect(vue.vm.intitule_markdownifie.trim()).toEqual(htmlAttendu);
    });
  });

  describe('#afficheLectureTexteEntete', function () {
    it("Quand la question à un son, affiche le bouton lecture texte entete", function () {
      depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      expect(vue.vm.afficheLectureTexteEntete).toBe(true);
      expect(vue.vm.$refs.boutonLectureTexteEntete).toBeDefined();
    });

    it("Quand la question n'a pas de son, n'affiche pas le bouton lecture texte entete", function () {
      depotRessources.existeMessageAudio = () => false;
      const vue = composant(question);
      expect(vue.vm.afficheLectureTexteEntete).toBe(false);
      expect(vue.vm.$refs.boutonLectureTexteEntete).not.toBeDefined();
    });
  });

  describe('#afficheLectureQuestionAudio', function () {
    it('affiche un bouton lecture lorsque la réponse a un audio associé', function () {
      depotRessources.existeMessageAudio =
      (nom_technique) => nom_technique == 'cuisine';
      const vue = composant({ reponse: { nom_technique: 'cuisine' } });
      expect(vue.vm.afficheLectureQuestionAudio).toBe(true);
      expect(vue.vm.$refs.boutonLectureQuestionAudio).toBeDefined();
    });

    it("affiche un bouton lecture lorsque l'intitulé a un audio associé", function () {
      depotRessources.existeMessageAudio =
      (nom_technique) => nom_technique == 'question1_intitule';
      const vue = composant({ nom_technique: 'question1', intitule_audio: 'audio.mp3' });
      expect(vue.vm.afficheLectureQuestionAudio).toBe(true);
      expect(vue.vm.$refs.boutonLectureQuestionAudio).toBeDefined();
    });

    it("n'affiche pas de bouton lecture lorsque la réponse n'a pas d'audio associé ni d'intitulé", function () {
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
      depotRessources.existeMessageAudio =
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
      depotRessources.existeMessageAudio = () => true;
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
      depotRessources.existeMessageAudio = () => true;
      const vue = composant(question);
      vue.vm.demarreSon();
      expect(mockDemarreSonQuestionAudio).not.toHaveBeenCalled();
      expect(mockDemarreSonTexteEntete).toHaveBeenCalled();
    });
  });
});
