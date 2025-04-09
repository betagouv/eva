import { mount } from '@vue/test-utils';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne.vue';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';
import { traduction } from 'commun/infra/internationalisation';
import { creeStore } from 'commun/modeles/store';

describe('Le composant VueRejoueConsigne', () => {
  let mockJournal;
  let wrapper;

  let store;

  const consigneDemarrage = function consigneDemarrage() {
    return new ArrayBuffer(10);
  };

  beforeEach(() => {
    store = creeStore();
    mockJournal = { enregistre: jest.fn() };
    
    wrapper = mount(VueRejoueConsigne, {
      props: {
        journal: mockJournal
      },
      global: {
        plugins: [store],
        mocks: {
          $depotRessources: {
            consigneDemarrage: consigneDemarrage
          },
          $traduction: traduction
        }
      }
    });
  });

  it("s'intègre correctement dans une page web", () => {
    expect(wrapper.findComponent({ name: 'BoutonLecture' }).exists()).toBe(true);
  });

  it("démarre le son approprié", () => {
    const audioBuffer = wrapper.vm.sonAJouer();

    expect(audioBuffer).toBeInstanceOf(ArrayBuffer);
    expect(audioBuffer.byteLength).toBe(10);
  });

  it("enregistre un événement RejoueConsigne", () => {
    wrapper.vm.enregistrerEvenement();

    expect(mockJournal.enregistre).toHaveBeenCalledWith(expect.any(EvenementRejoueConsigne));
  });
});
