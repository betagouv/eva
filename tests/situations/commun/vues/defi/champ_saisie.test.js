import { shallowMount, createLocalVue } from '@vue/test-utils';
import ChampSaisie from 'commun/vues/defi/champ_saisie';
import BoutonLecture from 'commun/vues/bouton_lecture';

describe('Le composant champ de saisie', function () {
  let vue;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    const depotRessources = new class {
      existeMessageAudio () {
        return false;
      }
    }();
    localVue.prototype.$depotRessources = depotRessources;
  });

  function composant (props) {
    return shallowMount(ChampSaisie, { localVue, propsData: props });
  }

  it('affiche un champ de saisie', function () {
    vue = composant({ question: {} });
    const input = vue.findAll('input[type=text]');
    expect(input.length).toBe(1);
    expect(input.at(0).classes('champ')).toBe(true);
  });

  describe('peut être utilisé avec la propriété v-model', function () {
    it('envoie la réponse dans un événement input', function () {
      vue = composant({ question: { bonneReponse: 'boulangerie' } });
      const input = vue.find('input[type=text]');
      input.setValue('Boulangerie ');
      expect(vue.emitted('input').length).toEqual(1);
      expect(vue.emitted('input')[0][0]).toEqual({ reponse: 'Boulangerie', succes: true });
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
        const conteneur = vue.find('.champ-saisie-conteneur');
        expect(conteneur.classes('chiffres-espaces')).toBe(true);
      });

      it('par défaut les chiffres ne sont pas espacés', function () {
        const conteneur = vue.find('.champ-saisie-conteneur');
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
      expect(input.classes()).toEqual(['champ', 'champ-texte']);
    });

    it('affiche le placeholder', function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('placeholder')).toEqual('Réponce');
    });

    it("n'affiche pas de trais de saisie", function () {
      expect(vue.find('.conteneur-traits-saisie').exists()).toBe(false);
    });

    it("limite la taille de l'input à 12", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual("12");
    });
  });

  describe('#afficheLectureReponse', function () {
    beforeEach(function () {
      const depotRessources = new class {
        existeMessageAudio (nomTechnique) {
          return nomTechnique == 'cuisine';
        }
      }();
      localVue.prototype.$depotRessources = depotRessources;
    });

    it('affiche un bouton lecture lorsque la réponse a un audio associé', function () {
      vue = composant({ question: { reponse: { nom_technique: 'cuisine' } } });
      expect(vue.findComponent(BoutonLecture).exists()).toBe(true);
    });

    it("n'affiche pas de bouton lecture lorsque la réponse n'a pas d'audio associé", function () {
      vue = composant({ question: { reponse: { texte: 'sans audio' } } });
      expect(vue.findComponent(BoutonLecture).exists()).toBe(false);
    });
  });

  describe('#afficheLectureQuestion', function () {
    beforeEach(function () {
      const depotRessources = new class {
        existeMessageAudio (nomTechnique) {
          return nomTechnique == 'question-avec-audio';
        }
      }();
      localVue.prototype.$depotRessources = depotRessources;
    });

    it("décale l'affichage de la réponse", function () {
      vue = composant({ question: { nom_technique: 'question-avec-audio' } });
      expect(vue.find('.defi-champ-saisie--decale').exists()).toBe(true);
    });

    it("ne décale pas l'affichage de la réponse", function () {
      vue = composant({ question: { nom_technique: 'question-sans-audio' } });
      expect(vue.find('.defi-champ-saisie--decale').exists()).toBe(false);
    });
  });
});
