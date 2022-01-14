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
    expect(input.at(0).classes('champ')).toBe(true);
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

  describe("quand il est d'un sous-type numérique", function () {
    beforeEach(function () {
      vue = composant({ question: { sous_type: 'numerique' } });
    });

    it('ajoute les classes css', function () {
      const input = vue.find('input[type=text]');
      expect(input.classes()).toEqual(['champ', 'champ-numerique']);
    });

    it('affiche des traits de saisie', function () {
      expect(vue.find('.conteneur-traits-saisie').exists()).toBe(true);
    });

    it("limite la taille de l'input à 4", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual('4');
    });

    describe("l'espacement des chiffres peut-être configuré", function () {
      it('les chiffres peuvent être espacés à la demande', function () {
        vue = composant({ question: { espacerChiffres: true } });
        const conteneur = vue.find('.champ-numerique-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(true);
      });

      it('par défaut les chiffres ne sont pas espacés', function () {
        const conteneur = vue.find('.champ-numerique-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(false);
      });
    });
  });

  describe("quand il est d'un sous-type texte", function () {
    beforeEach(function () {
      vue = composant({ question: { sous_type: 'texte', placeholder: 'Réponce' } });
    });

    it('ajoute les classes css', function () {
      vue = composant({ question: { sous_type: 'texte' } });
      const input = vue.find('input[type=text]');
      expect(input.classes()).toEqual(['champ', 'champ-texte', 'champ-texte--decale']);
    });

    it('affiche le placeholder', function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('placeholder')).toEqual('Réponce');
    });

    it("n'affiche pas de trais de saisie", function () {
      expect(vue.find('.conteneur-traits-saisie').exists()).toBe(false);
    });

    it("ne limite pas la taille de l'input", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual(null);
    });
  });
});
