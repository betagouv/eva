import { shallowMount, createLocalVue } from '@vue/test-utils';
import ResultatIdentification from 'securite/vues/resultat_identification';

describe('Le composant RésultatIdentification', function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = new class {
      pictoDangerMalIdentifie () {
        return { src: 'danger-mal-identifie' };
      }

      pictoDangerBienIdentifie () {
        return { src: 'danger-bien-identifie' };
      }
    }();
  });

  function verifie (danger, succesIdentification, messageAttendu, pictoAttendu) {
    const wrapper = shallowMount(ResultatIdentification, {
      localVue,
      propsData: {
        localVue,
        danger: danger,
        succesIdentification: succesIdentification
      }
    });
    expect(wrapper.vm.messageResultatIdentification).toEqual(messageAttendu);
    expect(wrapper.vm.pictoResultatIdentification).toEqual(pictoAttendu);
  }

  it('Informe que le danger a été bien ou mal identifié', function () {
    verifie(true, false, 'securite.danger.identification.danger.echec', 'danger-mal-identifie');
    verifie(true, true, 'securite.danger.identification.danger.succes', 'danger-bien-identifie');
    verifie(false, false, 'securite.danger.identification.non-danger.echec', 'danger-mal-identifie');
    verifie(false, true, 'securite.danger.identification.non-danger.succes', 'danger-bien-identifie');
  });
});
