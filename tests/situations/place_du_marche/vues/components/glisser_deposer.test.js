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

  describe('#envoiReponse', function () {
    it('envoi la réponse au serveur', function () {
      genereVue([1, 4]);
      wrapper.vm.envoiReponse( { scoreMax: 1, succes: true, reponse: [1, 4] });
      expect(wrapper.emitted('reponse').length).toEqual(1);
      expect(wrapper.emitted('reponse')[0][0]).toEqual({
        scoreMax: 1,
        succes: true,
        reponse: [1, 4]
      });
    });

    describe('pour une zone de dépot multiple', function () {
      function envoyerReponse(succes, reponse) {
        wrapper.vm.envoiReponse({ scoreMax: 1, succes, reponse });
      }

      it('calcule le score au fur et à mesure en fonction du succès', function () {
        const zone = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iYm9ubmUtcmVwb25zZSIgd2lkdGg9IjEwODgiIGhlaWdodD0iNTY2IiB2aWV3Qm94PSIwIDAgMTA4OCA1NjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IGNsYXNzPSJ6b25lLWRlcG90IHpvbmUtZGVwb3QtLU4yUFExUjEiIHg9IjI0MCIgeT0iNzQiIHdpZHRoPSIyNTEiIGhlaWdodD0iMTYxIiBmaWxsPSIjMjAwMDlGIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz4KPHJlY3QgY2xhc3M9InpvbmUtZGVwb3Qgem9uZS1kZXBvdC0tTjJQUTFSMiIgeD0iNjMiIHk9IjMyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMjMiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K";
        genereVue([1, 2, 7, 8], zone);
        expect(wrapper.vm.zoneDepotMultiple).toEqual(true);
        envoyerReponse(true, [1]);
        expect(wrapper.vm.scoreTotal).toEqual(0.25);
        envoyerReponse(false, [1, 2]);
        expect(wrapper.vm.scoreTotal).toEqual(0.25);
        envoyerReponse(true, [1, 2, 3]);
        expect(wrapper.vm.scoreTotal).toEqual(0.5);
        envoyerReponse(false, [1, 2, 3, 4]);

        expect(wrapper.emitted('reponse')[0][0]).toEqual({
          scoreMax: 1,
          succes: false,
          score: 0.5,
          reponse: [1, 2, 3, 4]
        });
      });
    });
  });
});
