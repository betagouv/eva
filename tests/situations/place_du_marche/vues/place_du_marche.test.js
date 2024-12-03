import { shallowMount, config } from '@vue/test-utils';
import { creeStore,   NIVEAU1 } from 'place_du_marche/modeles/store';
import Defi from 'commun/vues/defi';
import PlaceDuMarche from 'place_du_marche/vues/place_du_marche';
import {
  DEMARRE
} from 'commun/modeles/situation';

describe('La vue place du marché', function () {
  let wrapper;
  let depotRessources;
  let store;
  let journal;
  const sousConsigne = { type: 'sous-consigne', nom_technique: 'sous-consigne' };
  const question = { id: 'N1Pse1', nom_technique: "N1Pse1" };

  const configuration = {
    questions: {
      [NIVEAU1]: {
        series: [
          { cartes: [question, { nom_technique: 'N1Pse2'}] },
          { cartes: [{ nom_technique: 'N1Prn1'}]},
        ],
      },
    }
  };

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  beforeEach(function () {
    store = creeStore();
    journal = { enregistre () {} };
    depotRessources = {
      questions: () => { return []; },
    };
    wrapper = shallowMount(PlaceDuMarche, {
      global: {
        plugins: [store],
        mocks: {
          $journal: journal,
          $depotRessources: depotRessources,
        },
        stubs: {
          TransitionFade: false
        }
      }
    });
  });

  describe("quand elle n'est pas configurée", function () {
    it("n'affiche pas de défi", function () {
      expect(wrapper.findComponent(Defi).exists()).toBe(false);
    });
  });

  describe("quand elle est configurée et l'acte démarré", function () {
    beforeEach(function() {
      store.state.etat = DEMARRE;
      store.commit('configureActe', configuration);
    });

    it('Affiche un défi', function () {
      expect(wrapper.findComponent(Defi).exists()).toBe(true);
    });

    it("emet 'terminer' quand c'est terminé", function (done) {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().terminer).not.toBeDefined();
        store.state.termine = true;
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().terminer).toBeTruthy();
          done();
        });
      });
    });

    it("enregistre la consigne en cours dans le dépot ressource", function(done) {
      wrapper.vm.$nextTick(() => {
        expect(depotRessources.consigneEnCours).toEqual(`${question.id}_consigne`);
        store.state.questionActive = { nom_technique: 'N1Pse2' };
        wrapper.vm.$nextTick(() => {
          expect(depotRessources.consigneEnCours).toEqual('N1Pse2_consigne');
          done();
        });
      });
    });

    it("enregistre le texte d'aide dans le dépot ressource", function(done) {
      wrapper.vm.$nextTick(() => {
        expect(depotRessources.texteAide).toBeUndefined();
        store.state.questionActive = { nom_technique: 'N1Pse2', aide: "texte d'aide" };
        wrapper.vm.$nextTick(() => {
          expect(depotRessources.texteAide).toEqual("texte d'aide");
          done();
        });
      });
    });

    describe('#reponse', function () {
      describe('quand la question est de type sous consigne', function () {
        it('passes à la carte suivante sans envoyé la réponse', function () {
          store.state.questionActive = sousConsigne;
          wrapper.vm.reponse({});
          expect(wrapper.vm.question).not.toEqual(sousConsigne);
        });
      });

      describe("quand la carte active n'est pas de type sous consigne", function () {
        beforeEach(function () {
          store.state.questionActive = question;
        });

        it('enregistre les réponses dans le store', function () {
          wrapper.vm.reponse({ question: 'question1', reponse: '100ml', score: 1 });
          expect(store.state.reponses['question1'])
            .toEqual({ question: 'question1', reponse: '100ml', score: 1 });
        });

        it("attribut un score de 0 si la réponse n'a pas de score", function() {
          wrapper.vm.reponse({ question: 'question1', reponse: '100ml' });
          expect(store.state.reponses['question1'].score)
            .toEqual(0);
        });
      });
    });
  });
});
