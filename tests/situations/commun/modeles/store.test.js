import { creeStore, synchroniseStoreEtModeleSituation } from 'commun/modeles/store';
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
      beforeEach(function () {
        store = creeStore();
        store.state.questionActive = { nom_technique: 'N1Prn1', score: 0.5, metacompetence: 'calcul' };
      });

      describe("si la question active a une question serveur avec le même suffixe", function() {
        let question;
        let questionServeur;

        beforeEach(function() {
          question = { nom_technique: 'N1Prn1_variant', intitule: 'intitulé serveur' };
          store.state.questions = [question];
          questionServeur = store.getters.questionServeur(store.state.questionActive);
        });

        it("retourne la question serveur", function() {
          expect(questionServeur.id).toEqual('N1Prn1');
          expect(questionServeur.intitule).toEqual('intitulé serveur' );
        });

        it("recupere les données du client", function() {
          expect(questionServeur.score).toEqual(0.5);
          expect(questionServeur.metacompetence).toEqual('calcul');
        });
      });

      describe("si la question active n'a pas de question serveur avec le même suffixe", function() {
        it('ne retourne rien', function() {
          store.state.questions = [];
          expect(store.getters.questionServeur(store.state.questionActive)).toBeUndefined();
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
