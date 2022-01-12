import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChampSaisie from 'commun/vues/defi/champ_saisie';

describe('Le composant defi numérique', function () {
  let vue;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    vue = composant({ question: {} });
  });

  function composant (props) {
    return shallowMount(ChampSaisie, { localVue, propsData: props });
  }

  it('affiche un champ de saisie', function () {
    const input = vue.findAll('input[type=text]');
    expect(input.length).toBe(1);
    expect(input.at(0).classes('input-numerique')).toBe(true);
  });

  describe('peut être utilisé avec la propriété v-model', function () {
    it('afficher la valeur initial si elle est passé', function () {
      vue = composant({ question: {}, value: 'valeurInitiale' });
      const input = vue.find('input[type=text]');
      expect(input.element.value).toEqual('valeurInitiale');
    });

    it('envoie la réponse dans un événement input', function () {
      const input = vue.find('input[type=text]');
      input.setValue('1800 ');
      expect(vue.emitted('input').length).toEqual(1);
      expect(vue.emitted('input')[0][0]).toEqual('1800');
    });
  });

  describe('quand les chiffres doivent être espacés', function () {
    beforeEach(function () {
      vue = composant({ question: { espacerCaracteres: true } });
    });

    it('ajoute la classe css', function () {
      const conteneur = vue.find('.input-numerique-conteneur');
      expect(conteneur.classes('chiffres-espaces')).toBe(true);
    });
  });

  describe('quand les chiffres ne doivent pas être espacés (par défaut)', function () {
    it("n'ajoute pas de classe css", function () {
      const conteneur = vue.find('.input-numerique-conteneur');
      expect(conteneur.classes('chiffres-espaces')).toBe(false);
    });
  });
});
