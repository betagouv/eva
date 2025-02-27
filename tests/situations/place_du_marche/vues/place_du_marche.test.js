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

    describe('quand il y a une aide', function () {
      function mockAfficheAide() {
        jest.spyOn(wrapper.vm, 'afficheBoutonDemandeAide').mockImplementation(function() {
          const bouton = document.createElement('button');
          bouton.className = 'actions-aide';
          document.body.appendChild(bouton);
          bouton.style.display = this.question.aide ? '' : 'none';
        });
      }

      beforeEach(function() {
        store.state.questionActive = { nom_technique: 'N1Pse2', aide: "texte d'aide" };
        mockAfficheAide();
      });

      it("enregistre le texte d'aide dans le dépot ressource", function(done) {
        wrapper.vm.$nextTick(() => {
          store.state.questionActive = { nom_technique: 'N1Pse2', aide: "texte d'aide" };
          wrapper.vm.$nextTick(() => {
            expect(depotRessources.texteAide).toEqual("texte d'aide");
            done();
          });
        });
      });

      it('affiche le bouton d\'aide', function () {
        expect(document.querySelector('.actions-aide')).not.toBeNull();
      });
    });

    describe("quand il n'y a pas d'aide", function() {
      it('ne pas afficher le bouton d\'aide', function () {
        expect(document.querySelector('.actions-aide')).toBeNull();
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
          expect(store.state.aide).toBe(false);
          wrapper.vm.reponse({ question: 'question1', reponse: '100ml', score: 1 });
          expect(store.state.reponses['question1'])
            .toEqual({ question: 'question1', reponse: '100ml', score: 1 });
        });

        it("retire 0.5 si l'aide a été activée", function() {
          store.state.aide = true;
          wrapper.vm.reponse({ question: 'question1', reponse: '100ml', score: 1, scoreMax: 1 });
          expect(store.state.reponses['question1'].score)
            .toEqual(0.5);
        });
      });
    });
  });
});
