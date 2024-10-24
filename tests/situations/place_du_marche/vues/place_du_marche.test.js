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
      questionEnCours: () => { return null; },
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

  describe('quand elle est configurée', function () {
    beforeEach(function() {
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
  });

  describe("quand elle est configurée et l'acte démarré", function () {
    beforeEach(function() {
      store.state.etat = DEMARRE;
      store.commit('configureActe', configuration);
    });

    it.only("enregistre la question en cours dans le dépot ressource", function(done) {
      wrapper.vm.$nextTick(() => {
        expect(depotRessources.consigneEnCours).toEqual(`${question.id}_consigne`);
        store.state.questionActive = { nom_technique: 'N1Pse2' };
        wrapper.vm.$nextTick(() => {
          expect(depotRessources.consigneEnCours).toEqual('N1Pse2_consigne');
          done();
        });
      });
    });
  });
});
