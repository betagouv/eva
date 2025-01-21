import { creeStore, synchroniseStoreEtModeleSituation } from 'commun/modeles/store';
import { fakeQuestionServeurClicSurMots, fakeQuestionServeurDansImage, fakeQuestionServeurGlisserDeposer, fakeQuestionServeurSaisie } from '../../../fixtures/questions';
import Situation, {
  CHARGEMENT,
  FINI,
  DEMARRE,
  ENTRAINEMENT_DEMARRE
} from 'commun/modeles/situation';

describe('Le store en commun pour les situations', function () {
  let store;

  it("initialise l'état a CHARGEMENT", function () {
    const store = creeStore();
    expect(store.state.etat).toEqual(CHARGEMENT);
  });

  it("permet de changer l'état", function () {
    const store = creeStore();
    store.commit('modifieEtat', FINI);
    expect(store.state.etat).toEqual(FINI);
  });

  it("permet de synchroniser l'état du modèle situation avec le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.modifieEtat(FINI);
    expect(store.state.etat).toEqual(FINI);
  });

  it('permet de synchroniser le store avec le modèle situation', function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('modifieEtat', FINI);
    expect(situation.etat()).toEqual(FINI);
  });

  it("synchronise seulement les changements d'état du store avec le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('activeAide');
    expect(situation.etat()).toEqual(CHARGEMENT);
  });

  it("synchronise l'état initial du modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    situation.modifieEtat(FINI);
    synchroniseStoreEtModeleSituation(situation, store);
    expect(store.state.etat).toEqual(FINI);
  });

  it("permet de synchroniser l'aide entre le modèle situation et le store", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    situation.activeAide();
    expect(store.state.aide).toBe(true);
  });

  it("permet de synchroniser l'aide entre le store et le modèle situation", function () {
    const store = creeStore();
    const situation = new Situation();
    synchroniseStoreEtModeleSituation(situation, store);
    store.commit('activeAide');
    expect(situation.aideActivee).toBe(true);
  });

  it("active l'aide", function () {
    const store = creeStore();
    expect(store.state.aide).toBe(false);
    store.commit('activeAide');
    expect(store.state.aide).toBe(true);
  });

  describe('Getters', function () {
    beforeEach(function () {
      store = creeStore();
    });

    describe('#acteEnCours', function () {
      beforeEach(function () {
        store = creeStore();
      });

      it("Quand l'acte n'est pas demarré", function () {
        expect(store.getters.acteEnCours).toBe(false);
      });

      it("Quand l'acte principal est demarré", function () {
        store.state.etat = DEMARRE;
        expect(store.getters.acteEnCours).toBe(true);
      });

      it("Quand l'acte d'entrainement est demarré", function () {
        store.state.etat = ENTRAINEMENT_DEMARRE;
        expect(store.getters.acteEnCours).toBe(true);
      });
    });

    describe('#questionServeur', function() {
      let questionServeur;
      let questionClient;
      let question;

      beforeEach(function () {
        store = creeStore();
        questionClient = { id: 'N1Prn1', nom_technique: 'N1Prn1', score: 0.5, metacompetence: 'calcul', retranscription_audio: 'audio' };
        store.state.questionActive = questionClient;
        store.state.questions = [fakeQuestionServeurClicSurMots, fakeQuestionServeurDansImage, fakeQuestionServeurGlisserDeposer, fakeQuestionServeurSaisie];
      });

      describe("si la question active a une question serveur avec le même suffixe", function() {
        beforeEach(function() {
          fakeQuestionServeurClicSurMots.nom_technique = 'N1Prn1_variant';
          questionServeur = store.getters.questionServeur(store.state.questionActive);
        });

        it("retourne les données du serveur", function() {
          expect(questionServeur.id).toEqual(fakeQuestionServeurClicSurMots.id);
          expect(questionServeur.intitule).toEqual(fakeQuestionServeurClicSurMots.intitule);
          expect(questionServeur.nom_technique).toEqual(fakeQuestionServeurClicSurMots.nom_technique);
          expect(questionServeur.modalite_reponse).toEqual(fakeQuestionServeurClicSurMots.modalite_reponse);
          expect(questionServeur.illustration).toEqual(fakeQuestionServeurClicSurMots.illustration);
        });
      });

      describe("si la question active n'a pas de question serveur avec le même suffixe", function() {
        it('ne retourne rien', function() {
          store.state.questions = [];
          expect(store.getters.questionServeur(store.state.questionActive)).toBeUndefined();
        });
      });

      describe("pour tous les types de questions", function() {
        beforeEach(function() {
          questionClient.nom_technique = fakeQuestionServeurClicSurMots.nom_technique;
          questionServeur = store.getters.questionServeur(questionClient);
        });

        it("recupere le paramétrage commun du client", function() {
          expect(questionServeur.score).toEqual(0.5);
          expect(questionServeur.metacompetence).toEqual('calcul');
          expect(questionServeur.id).toEqual('N1Prn1');
          expect(questionServeur.retranscription_audio).toEqual('audio');
        });
      });

      describe("pour les questions de type clic-sur-mots", function() {
        beforeEach(function() {
          question = { ...questionClient, ...{
            nom_technique: fakeQuestionServeurClicSurMots.nom_technique,
            template: "article article--disque",
            extensionVue: "clic-sur-mots",
          }};
          questionServeur = store.getters.questionServeur(question);
        });

        it("recupere le paramétrage du serveur", function() {
          expect(questionServeur.reponse).toEqual(fakeQuestionServeurClicSurMots.reponse);
        });

        it("recupere le paramétrage du client", function() {
          expect(questionServeur.extensionVue).toEqual('clic-sur-mots');
          expect(questionServeur.template).toEqual('article article--disque');
        });
      });

      describe("pour les questions de type clic-dans-image", function() {
        beforeEach(function() {
          question = { ...questionClient, ...{
            nom_technique: fakeQuestionServeurDansImage.nom_technique,
          }};
          questionServeur = store.getters.questionServeur(question);
        });

        it("recupere le paramétrage du client", function() {
          expect(questionServeur.extensionVue).toEqual('clic-dans-image');
        });

        it("recupere le paramétrage du serveur", function() {
          expect(questionServeur.zone_cliquable_url).toEqual(fakeQuestionServeurDansImage.zone_cliquable_url);
        });
      });

      describe("pour les questions de type glisser-deposer", function() {
        beforeEach(function() {
          question = { ...questionClient, ...{
            nom_technique: fakeQuestionServeurGlisserDeposer.nom_technique,
          }};
          questionServeur = store.getters.questionServeur(question);
        });

        it("recupere le paramétrage du client", function() {
          expect(questionServeur.extensionVue).toEqual('glisser-deposer');
        });

        it("recupere le paramétrage du serveur", function() {
          expect(questionServeur.zone_depot_url).toEqual(fakeQuestionServeurGlisserDeposer.zone_depot_url);
        });
      });

      describe("pour les questions de type saisie", function() {
        beforeEach(function() {
          question = { ...questionClient, ...{
            nom_technique: fakeQuestionServeurSaisie.nom_technique,
            score_bonus: 1.5,
            score_acceptable: 0.5,
            extensionVue: 'liste-courses-a-trous',
          }};
          questionServeur = store.getters.questionServeur(question);
        });

        it("recupere le paramétrage du client", function() {
          expect(questionServeur.extensionVue).toEqual('liste-courses-a-trous');
          expect(questionServeur.score_acceptable).toEqual(0.5);
          expect(questionServeur.score_bonus).toEqual(1.5);
        });

        it("recupere le paramétrage du serveur", function() {
          expect(questionServeur.reponses).toEqual(fakeQuestionServeurSaisie.reponses);
        });
      });
    });

    describe('#recupereQuestionsServeur', function() {
      beforeEach(function () {
        store = creeStore();
      });

      it('met à jour les questions avec les questions serveur', function() {
        const questions = [{ nom_technique: 'N1Pse1' }, { nom_technique: 'N1Pse2' }];
        store.commit('recupereQuestionsServeur', questions);

        expect(store.state.questions).toEqual(questions);
      });
    });
  });
});
