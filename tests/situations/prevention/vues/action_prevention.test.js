import { shallowMount, createLocalVue } from '@vue/test-utils';
import ActionPrevention from 'prevention/vues/action_prevention';
import MockDepotRessources from '../aides/mock_depot_ressources_prevention';

describe('Action Prevention', function () {
  let depotRessources;
  let localVue;
  let wrapper;

  beforeEach(function () {
    localVue = createLocalVue();
    depotRessources = new MockDepotRessources();
    localVue.prototype.$depotRessources = depotRessources;
    wrapper = shallowMount(ActionPrevention, {
      localVue,
      propsData: {
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
