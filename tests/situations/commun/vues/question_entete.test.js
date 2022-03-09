import { shallowMount, createLocalVue } from '@vue/test-utils';
import { creeStore } from 'commun/modeles/store';
import BoutonLecture from 'commun/vues/bouton_lecture';
import VueQuestionEntete from 'commun/vues/question_entete';

describe('la vue du composant entête', function () {
  let question;
  let localVue;
  let store;

  beforeEach(function () {
    store = creeStore();
    question = { id: 154, choix: [], nom_technique: 'question1' };
    localVue = createLocalVue();
    localVue.prototype.$journal = { enregistre () {} };
    localVue.prototype.$traduction = () => {};
    localVue.prototype.$depotRessources = {
      reponseAudio: () => {
        return 'chemin de la ressource';
      },
      existeMessageAudio: () => false
    };
  });

  it("affiche le bouton lecture s'il existe un son", function () {
    localVue.prototype.$depotRessources.existeMessageAudio = () => true;
    const vue = shallowMount(VueQuestionEntete, { localVue, store, propsData: { question } });

    expect(vue.findComponent(BoutonLecture).exists()).toBe(true);
  });

  it("n'affiche pas le bouton lecture s'il n'existe pas de son", function () {
    localVue.prototype.$depotRessources.existeMessageAudio = () => false;
    const vue = shallowMount(VueQuestionEntete, { localVue, store, propsData: { question } });

    expect(vue.findComponent(BoutonLecture).exists()).toBe(false);
  });
});
