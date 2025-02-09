import { shallowMount, config } from '@vue/test-utils';
import { creeStore, ORIENTATION } from 'cafe_de_la_place/modeles/store';
import Defi from 'commun/vues/defi';
import CafeDeLaPlace from 'cafe_de_la_place/vues/cafe_de_la_place';
import Pagination from 'commun/vues/components/pagination';
import { DEMARRE } from 'commun/modeles/situation';

describe('La vue café de la place', function () {
  let wrapper;
  let store;
  let depotRessources;
  let journal;
  const sousConsigne = { id: 'sous-consigne', type: 'sous-consigne' };
  const question = { id: 'question1' };


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
    wrapper = shallowMount(CafeDeLaPlace, {
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
      const configuration = {
        questions: {
          [ORIENTATION]: {
            series: [
              { cartes: [sousConsigne] },
              { cartes: [question] }
            ]
          }
        }
      };
      store.commit('configureActe', configuration);
    });

    it('Affiche un défi', function () {
      expect(wrapper.findComponent(Defi).exists()).toBe(true);
    });

    it("n'affiche pas la pagination si la carte active est une sous consigne", function (done) {
      store.state.carteActive = sousConsigne;
      expect(wrapper.vm.affichePagination).toBe(false);
      expect(wrapper.findComponent(Pagination).exists()).toBe(false);

      store.state.carteActive = question;
      expect(wrapper.vm.affichePagination).toBe(true);
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.nombreCartes).toBe(1);
        expect(wrapper.findComponent(Pagination).exists()).toBe(true);
        done();
      });
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

    it("A la configuration, saute directement à un défi si son id est mentionné dans l'ancre", function(done) {
      location.hash = '#question1';
      store.state.etat = DEMARRE;

      wrapper.vm.$nextTick(() => {
        expect(store.state.carteActive).toEqual(question);
        done();
      });
    });

    it("A la configuration, démarre avec la première carte s'il n'y a pas d'ancre", function(done) {
      location.hash = '';
      store.state.etat = DEMARRE;

      wrapper.vm.$nextTick(() => {
        expect(store.state.carteActive).toEqual(sousConsigne);
        done();
      });
    });

    it("reaffecte l'extensionVue puzzle-journal si elle est de type glisser-deposer", function (done) {
      question.extensionVue = 'glisser-deposer';
      store.state.carteActive = question;

      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.question.extensionVue).toBe('puzzle-journal');
        done();
      });
    });

    describe('#reponse', function () {
      describe('quand la carte active est de type sous consigne', function () {
        it('passes à la carte suivante', function () {
          store.state.carteActive = sousConsigne;
          const question_courante = wrapper.vm.carteActive.id;
          wrapper.vm.reponse({});
          expect(wrapper.vm.carteActive.id).not.toEqual(question_courante);
        });
      });

      describe("quand la carte active n'est pas de type sous consigne", function () {
        beforeEach(function () {
          store.state.carteActive = question;
        });

        it('enregistre les réponses dans le store', function () {
          wrapper.vm.reponse({ question: 'question1', reponse: 'cuisine' });
          expect(store.state.reponses['question1'])
            .toEqual({ question: 'question1', reponse: 'cuisine', score: 0 });
        });

        it('enregistre les réponses dans le journal', function (done) {
          journal.enregistre = () => {
            done();
          };
          wrapper.vm.reponse({});
        });
      });
    });
  });
});
