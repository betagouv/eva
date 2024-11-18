import { shallowMount } from '@vue/test-utils';
import ChampSaisie from 'commun/vues/defi/champ_saisie';

describe('Le composant champ de saisie', function () {
  let vue;
  let mockDemarreSon;
  let BoutonLectureStub;
  let depotRessources;

  beforeEach(function () {
    mockDemarreSon = jest.fn();
    BoutonLectureStub = {
      name: 'BoutonLecture',
      template: '<span />',
      methods: {
        demarreSon: mockDemarreSon
      }
    };
    depotRessources = {
      existeMessageAudio: () => false
    };
  });

  function composant (props) {
    return shallowMount(ChampSaisie, {
      global: {
        mocks: {
          $depotRessources: depotRessources
        }
      },
      props: props,
      attachTo: document.body,
      stubs: {
        'bouton-lecture': BoutonLectureStub
      }
    });
  }

  it('affiche un champ de saisie', function () {
    vue = composant({ question: {} });
    const input = vue.findAll('input[type=text]');
    expect(input.length).toBe(1);
    expect(input.at(0).classes('champ')).toBe(true);
  });

  describe('peut être utilisé avec la propriété v-model', function () {
    it('envoie la réponse dans un événement input', function () {
      vue = composant({ question: { reponses: [{ intitule: 'boulangerie' }] } });
      const input = vue.find('input[type=text]');
      input.setValue('Boulangerie ');
      expect(vue.emitted('reponse')[0].length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'Boulangerie', succes: true, score: 0 });
    });
  });

  describe('#emetReponse', function() {
    describe('quand on attend pas de réponse particulière', function() {
      beforeEach(function() {
        vue = composant({ question: { } });
      });

      it("emet la réponse", function() {
        vue.vm.emetReponse('texte saisi');
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'texte saisi'
        });
      });
    });

    describe('quand on attend une réponse particulière', function() {
      beforeEach(function() {
        vue = composant({ question: { score: 1, score_bonus: 1.5, score_acceptable: 0.75, reponses: [
          {
            intitule: 'boulangerie',
            type_choix: 'bon'
          },
          {
            intitule: 'boulangeries',
            type_choix: 'bonus'
          },
          {
            intitule: 'boulangeri',
            type_choix: 'acceptable'
          }
        ]}});
      });

      it("retourne un echec si la réponse n'est pas dans la liste", function() {
        vue.vm.emetReponse('boulangery');
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangery',
          succes: false,
          score: 0,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'bon' avec son score", function() {
        vue.vm.emetReponse('boulangerie');
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangerie',
          succes: true,
          score: 1,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'bonus' avec son score", function() {
        vue.vm.emetReponse('boulangeries');
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangeries',
          succes: true,
          score: 1.5,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'acceptable' avec son score", function() {
        vue.vm.emetReponse('boulangeri');
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangeri',
          succes: true,
          score: 0.75,
          scoreMax: 1.5
        });
      });
    });

    describe("quand la question n'a pas de score bonus", function() {
      beforeEach(function() {
        vue = composant({ question: { score: 1, reponses: [ { intitule: '99'}] } });
      });

      it("retourne le score maximum dans la réponse", function() {
        vue.vm.emetReponse('6');
        expect(vue.emitted('reponse')[0][0].scoreMax).toEqual(1);
      });
    });

    describe("quand la question a un score bonus", function() {
      beforeEach(function() {
        vue = composant({ question: { score: 1, score_bonus: 1.5, reponses: [ { intitule: '99'}] } });
      });

      it("retourne le score maximum dans la réponse", function() {
        vue.vm.emetReponse('6');
        expect(vue.emitted('reponse')[0][0].scoreMax).toEqual(1.5);
      });
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

    it("pas de limite de taille par défaut", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual(null);
    });

    it("limite la taille de l'input lorsque la question a une max length", function () {
      vue = composant({ question: { sous_type: 'numerique', max_length: 5 } });
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual('5');
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

    it("limite la taille de l'input à 15", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('maxlength')).toEqual("15");
    });
  });

  describe('#afficheLectureQuestion', function () {
    beforeEach(function () {
      depotRessources = new class {
        existeMessageAudio (nomTechnique) {
          return nomTechnique == 'question-avec-audio';
        }
      }();
    });

    it("décale l'affichage de la réponse", function () {
      vue = composant({ question: { nom_technique: 'question-avec-audio' } });
      expect(vue.find('.champ-saisie--decale').exists()).toBe(true);
    });

    it("ne décale pas l'affichage de la réponse", function () {
      vue = composant({ question: { nom_technique: 'question-sans-audio' } });
      expect(vue.find('.champ-saisie--decale').exists()).toBe(false);
    });
  });

  describe("met le focus sur l'input au démarrage", function() {
    it("quand on est sur firefox", function() {
      vue = composant({ question: { nom_technique: 'question' }, estFirefox: true });
      const input = vue.find('input[type=text]');
      expect(document.activeElement).toBe(input.element);
    });

    it("sur les autres navigateurs", function() {
      vue = composant({ question: { nom_technique: 'question' } });
      const input = vue.find('input[type=text]');
      expect(input.attributes('autofocus')).toBe("");
    });
  });
});
