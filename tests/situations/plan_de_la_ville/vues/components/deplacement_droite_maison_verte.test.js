import { shallowMount } from '@vue/test-utils';

import DeplacementDroite from 'plan_de_la_ville/vues/components/deplacement_droite_maison_verte.vue';

describe('La vue Déplacement droite maison verte', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(DeplacementDroite);
  });

  it('permet de passer à la question suivante en appuyant sur la flèche droite', function () {
    wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted()).toHaveProperty('action');
  });
});
