import { mount } from '@vue/test-utils';
import FenetreAide, { FERME } from 'commun/vues/fenetre_aide';
import { traduction } from 'commun/infra/internationalisation';

describe("La fenêtre d'aide", function () {
  let wrapper;
  let depot;

  const vue = (texteAide = undefined, contexte = '') => {
    depot = { texteAide };
    return mount(FenetreAide, {
      props: { contexte },
      global: {
        mocks: {
          $traduction: traduction,
          $depotRessources: depot
        }
      }
    });
  };

  it('au click sur le bouton, envoi un événement', function () {
    wrapper = vue();
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted(FERME).length).toEqual(1);
  });

  describe('quand le texte d\'aide est défini', function () {
    it("affiche le texte d'aide", function () {
      wrapper = vue('texte aide', 'inventaire');
      expect(wrapper.text()).toContain('texte aide');
    });
  });

  describe('quand le texte d\'aide est vide', function () {
    it("affiche un message par défaut lorsque texteAide est undefined", function () {
      wrapper = vue(undefined, 'inventaire');
      expect(wrapper.text()).toContain(traduction('inventaire.texte_aide'));
    });
  });

  it('retoune le texte en markdown', function () {
    wrapper = vue('**texte**');
    expect(wrapper.find('strong').exists()).toBe(true);
  });
});
