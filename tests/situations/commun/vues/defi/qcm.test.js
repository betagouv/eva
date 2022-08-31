import { shallowMount } from '@vue/test-utils';
import Qcm from 'commun/vues/defi/qcm';
import ReponseAudioQcm from 'commun/vues/reponse_audio_qcm';

describe('Le componsant defi QCM', function () {
  let question;
  let depotRessources;

  beforeEach(function () {
    question = { id: 154, choix: [], nom_technique: 'question1' };
    depotRessources = {
      reponseAudio: () => {
        return 'chemin de la ressource';
      },
      existeMessageAudio: () => false
    };
  });

  function composant (question) {
    return shallowMount(Qcm, {
      global: {
        mocks: {
          $depotRessources: depotRessources
        },
      },
      props: { question }
    });
  }

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const vue = composant(question);
    expect(vue.findAll('input[type=radio]').length).toBe(5);
  });

  describe('quand il y a des réponses audio', function () {
    let vue;

    beforeEach(function () {
      question.choix = [{ id: 'premiere-reponse-audio', audio: '1' }, { audio: '1' }, { audio: '1' }];
      vue = composant(question);
    });

    it('affiche un control audio sur chaque réponse', function () {
      expect(vue.findAllComponents(ReponseAudioQcm).length).toBe(3);
    });

    it("joue l'audio d'une réponse audio quand elle est selectionnée", function (done) {
      const premiereReponseAudio = vue.findAllComponents(ReponseAudioQcm).at(0);
      vue.find('input[type=radio][value=premiere-reponse-audio]').setChecked();
      vue.vm.$nextTick(() => {
        expect(premiereReponseAudio.vm.joueSon).toEqual(true);
        done();
      });
    });
  });

  it('affiche une image sur chaque réponse', function () {
    question.choix = [{ image: '1' }, { image: '1' }, { image: '1' }];
    const vue = composant(question);
    expect(vue.findAll('img').length).toBe(3);
  });

  describe('envoie la réponse dans un événement input', function () {
    it('quand il y a une bonne réponse', function () {
      question.choix = [{ id: 'uid-32', score: 1, bonneReponse: true }];
      const vue = composant(question);
      vue.find('input[type=radio][value=uid-32]').setChecked();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'uid-32', succes: true, score: 1 });
    });

    it('quand il y a une mauvaise réponse', function () {
      question.choix = [{ id: 'uid-32', bonneReponse: false }];
      const vue = composant(question);
      vue.find('input[type=radio][value=uid-32]').setChecked();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'uid-32', succes: false });
    });

    it('quand il y a une mauvaise réponse avec un score', function () {
      question.choix = [{ id: 'uid-32', score: 0.5, bonneReponse: false }];
      const vue = composant(question);
      vue.find('input[type=radio][value=uid-32]').setChecked();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'uid-32', succes: false, score: 0.5 });
    });

    it("quand il n'y a pas de bonne réponse", function () {
      question.choix = [{ id: 'uid-32' }];
      const vue = composant(question);
      vue.find('input[type=radio][value=uid-32]').setChecked();
      expect(vue.emitted('reponse').length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'uid-32' });
    });
  });
});
