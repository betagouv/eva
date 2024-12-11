import glisserDeposer from 'place_du_marche/vues/components/glisser_deposer.vue';
import { config, mount } from '@vue/test-utils';

describe('Le composant Glisser Déposer de place du marché', function () {
  let wrapper;

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  function genereVue(reponsesNonClassees = []) {
    wrapper = mount(glisserDeposer, {
      global: {
        mocks: {
          $traduction: () => {}
        }
      },
      props: {
        question: {
          reponsesNonClassees,
          score: 1
        }
      }
    });
  }

  function mockNombreZonesDeDepot(nombre) {
    jest.spyOn(wrapper.vm, 'nombreZonesDeDepot', 'get').mockReturnValue(nombre);
  }

  it("affiche le composant glisser déposer", function () {
    genereVue();
    expect(wrapper.find('.glisser-deposer').exists()).toBe(true);
  });

  describe('#envoiReponsesOrdonnees', function () {
    beforeEach(function () {
      genereVue([1, 4]);
    });

    it('envoi la réponse avec son ordre, son score et son succès en cas de succès', function () {
      wrapper.vm.envoiReponsesOrdonnees( { scoreMax: 1, succes: true, reponse: [1, 2] });
      expect(wrapper.emitted('reponse').length).toEqual(1);
      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        scoreMax: 1,
        succes: true,
        score: 1,
        reponse: [1, 2]
      });
    });

    it("envoi la réponse avec son ordre, son score et son succès en cas d'échec", function () {
      wrapper.vm.envoiReponsesOrdonnees( { scoreMax: 1, succes: false, reponse: [2, 1] });
      expect(wrapper.emitted('reponse').length).toEqual(1);
      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        scoreMax: 1,
        succes: false,
        score: 0,
        reponse: [2, 1]
      });
    });
  });

  describe('#envoiReponsesPlacees', function () {
    function envoyerReponse(succes, reponse) {
      wrapper.vm.envoiReponsesPlacees({ reponse, succes });
    }

    describe("quand il y a autant d'éléments à placer que de zones de dépôt", function () {
      beforeEach(function () {
        genereVue([1, 2, 3, 4]);
        mockNombreZonesDeDepot(4);
      });

      it('émet un événement avec au moins une réponse placée', function () {
        envoyerReponse(true, 'N1Pse1');

        expect(wrapper.vm.auMoinsUneReponsePlacee).toBe(true);
        expect(wrapper.emitted('reponse')[0][0]).toEqual({
          scoreMax: 1,
          succes: false,
          score: 0.25,
          reponse: ['N1Pse1']
        });
      });

      it('émet un événement avec toutes les réponses placées', function () {
        envoyerReponse(true, 'N1Pse1');
        envoyerReponse(true, 'N1Pse2');
        envoyerReponse(true, 'N1Pse3');
        envoyerReponse(true, 'N1Pse4');

        expect(wrapper.emitted('reponse')).toEqual(
          expect.arrayContaining([[{ "reponse": ["N1Pse1", "N1Pse2", "N1Pse3", "N1Pse4"], "score": 1, "scoreMax": 1, "succes": true }]])
        );
      });
    });

    describe("quand il y a plus d'éléments à placer que de zones de dépôt", function () {
      beforeEach(function () {
        genereVue([1, 2, 3, 4]);
        mockNombreZonesDeDepot(3);
      });

      it('émet un événement avec la moitié du score si une seule réponse est mal placée', function () {
        envoyerReponse(true, 'N1Pse1');
        envoyerReponse(false, 'N1Pse2');
        envoyerReponse(true, 'N1Pse3');

        expect(wrapper.emitted('reponse')).toEqual(
          expect.arrayContaining([[{ "reponse": ["N1Pse1", "N1Pse2", 'N1Pse3'], "score": 0.5, "scoreMax": 1, "succes": false }]])
        );
      });
    });
  });

  describe('#calculeScoreUneFauteAutorisee', function () {
    beforeEach(function () {
      genereVue([1, 2, 3, 4]);
      mockNombreZonesDeDepot(3);
    });

    it('calcule le score si toutes les réponses sont bien placées', function () {
      wrapper.vm.reponsesPlacees = [{succes: true}, {succes: true}, {succes: true}];
      const score = wrapper.vm.calculeScoreUneFauteAutorisee();
      expect(score).toEqual(1);
    });

    it('calcule le score si seulement une réponse est mal placée', function () {
      wrapper.vm.reponsesPlacees = [{succes: true}, {succes: false}, {succes: true}];
      const score = wrapper.vm.calculeScoreUneFauteAutorisee();
      expect(score).toEqual(0.5);
    });

    it("calcule le score si plus d'une réponse est mal placées", function () {
      wrapper.vm.reponsesPlacees = [{succes: false}, {succes: false}, {succes: true}];
      const score = wrapper.vm.calculeScoreUneFauteAutorisee();
      expect(score).toEqual(0);
    });
  });
});
