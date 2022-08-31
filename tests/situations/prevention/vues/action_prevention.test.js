import { shallowMount } from '@vue/test-utils';
import ActionPrevention from 'prevention/vues/action_prevention';
import MockDepotRessources from '../aides/mock_depot_ressources_prevention';

describe('Action Prevention', function () {
  let depotRessources;
  let wrapper;

  beforeEach(function () {
    depotRessources = new MockDepotRessources();
    wrapper = shallowMount(ActionPrevention, {
      global: {
        mocks: {
          $depotRessources: depotRessources
        }
      },
      props: {
        zone: {
          action_prevention: [{ type: 'correct' }, { type: 'mauvais' }]
        }
      }
    });
  });

  it('affiche les 2 images', function () {
    expect(wrapper.findAll('img').length).toEqual(2);
  });

  it('émet le type de réponse à la sélection', function (done) {
    wrapper.find('img:last-child').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('selectionPrevention')[0]).toEqual(['mauvais']);
      done();
    });
  });
});
