import { shallowMount } from '@vue/test-utils';
import ActePrevention from 'prevention/vues/acte';
import { creeStore } from 'securite/modeles/store';

describe("La vue de l'acte prévention", function () {
  let wrapper;
  let store;

  beforeEach(function () {
    store = creeStore();
    wrapper = shallowMount(ActePrevention, {
      store
    });
  });

  it('affiche le fond', function () {
    store.commit('configureActe', { fondSituation: 'fondSituation' });
    expect(wrapper.attributes('style')).to.eql('background-image: url(fondSituation);');
  });
});
