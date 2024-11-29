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

  function genereVue(reponsesNonClassees, zone_depot_url = null) {
    wrapper = mount(glisserDeposer, {
      global: {
        mocks: {
          $traduction: () => {}
        }
      },
      props: {
        question: {
          reponsesNonClassees,
          score: 1,
          zone_depot_url
        }
      }
    });
  }

  it("affiche le composant glisser déposer", function () {
    genereVue([]);
    expect(wrapper.find('.glisser-deposer').exists()).toBe(true);
  });

  describe('#envoiReponsesOrdonnees', function () {
    it('envoi la réponse avec son ordre, son score et son succès en cas de succès', function () {
      genereVue([1, 4]);
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
      genereVue([1, 4]);
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

    beforeEach(function () {
      jest.restoreAllMocks();
    });

    it('émet un événement avec au moins une réponse placée', function () {
      const zone = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iYm9ubmUtcmVwb25zZSIgd2lkdGg9IjEwODgiIGhlaWdodD0iNTY2IiB2aWV3Qm94PSIwIDAgMTA4OCA1NjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IGNsYXNzPSJ6b25lLWRlcG90IHpvbmUtZGVwb3QtLU4yUFExUjEiIHg9IjI0MCIgeT0iNzQiIHdpZHRoPSIyNTEiIGhlaWdodD0iMTYxIiBmaWxsPSIjMjAwMDlGIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz4KPHJlY3QgY2xhc3M9InpvbmUtZGVwb3Qgem9uZS1kZXBvdC0tTjJQUTFSMiIgeD0iNjMiIHk9IjMyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMjMiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K";
      genereVue([1, 2, 3, 4], zone);
      expect(wrapper.vm.zoneDeDepots.length > 0).toEqual(true);

      envoyerReponse(true, 'N1Pse1');

      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        scoreMax: 1,
        succes: false,
        score: 0.25,         reponse: ['N1Pse1']
      });
    });

    it('émet un événement avec toutes les réponses placées', function () {
      const zone = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iYm9ubmUtcmVwb25zZSIgd2lkdGg9IjEwODgiIGhlaWdodD0iNTY2IiB2aWV3Qm94PSIwIDAgMTA4OCA1NjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IGNsYXNzPSJ6b25lLWRlcG90IHpvbmUtZGVwb3QtLU4yUFExUjEiIHg9IjI0MCIgeT0iNzQiIHdpZHRoPSIyNTEiIGhlaWdodD0iMTYxIiBmaWxsPSIjMjAwMDlGIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz4KPHJlY3QgY2xhc3M9InpvbmUtZGVwb3Qgem9uZS1kZXBvdC0tTjJQUTFSMiIgeD0iNjMiIHk9IjMyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMjMiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K";
      genereVue([1, 2, 3, 4], zone);
      expect(wrapper.vm.zoneDeDepots.length > 0).toEqual(true);

      envoyerReponse(true, 'N1Pse1');
      envoyerReponse(true, 'N1Pse2');
      envoyerReponse(true, 'N1Pse3');
      envoyerReponse(true, 'N1Pse4');

      expect(wrapper.emitted('reponse')).toEqual(
        expect.arrayContaining([[{ "reponse": ["N1Pse1", "N1Pse2", "N1Pse3", "N1Pse4"], "score": 1, "scoreMax": 1, "succes": true }]])
      );
    });
  });
});
