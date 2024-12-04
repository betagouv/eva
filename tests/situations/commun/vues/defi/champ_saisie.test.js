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

  describe('#saisieReponse', function() {
    describe('quand on attend pas de réponse particulière', function() {
      beforeEach(function() {
        vue = composant({ question: { } });
      });

      it("emet la réponse", function() {
        const event = { target: { value: 'texte saisi' } };
        vue.vm.saisieReponse(event);
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
        const event = { target: { value: 'boulangery' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangery',
          succes: false,
          score: 0,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'bon' avec son score", function() {
        const event = { target: { value: 'boulangerie' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangerie',
          succes: true,
          score: 1,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'bonus' avec son score", function() {
        const event = { target: { value: 'boulangeries' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')[0][0]).toEqual({
          reponse: 'boulangeries',
          succes: true,
          score: 1.5,
          scoreMax: 1.5
        });
      });

      it("retourne un succès si la réponse est de type 'acceptable' avec son score", function() {
        const event = { target: { value: 'boulangeri' } };
        vue.vm.saisieReponse(event);
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
        const event = { target: { value: '6' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')[0][0].scoreMax).toEqual(1);
      });
    });

    describe("quand la question a un score bonus", function() {
      beforeEach(function() {
        vue = composant({ question: { score: 1, score_bonus: 1.5, reponses: [ { intitule: '99'}] } });
      });

      it("retourne le score maximum dans la réponse", function() {
        const event = { target: { value: '6' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')[0][0].scoreMax).toEqual(1.5);
      });
    });

    describe('quand on attend une réponse prix avec centimes', function() {
      beforeEach(function() {
        vue = composant({ question: { score: 1, sous_type: 'prix_avec_centimes', reponses: [
          {
            intitule: '1,99',
            type_choix: 'bon'
          }
        ]}});
      });

      it("n'envoie pas de réponse si l'utilisateur saisie des lettres", function() {
        const event = { target: { value: 'e' } };
        vue.vm.saisieReponse(event);
        expect(vue.emitted('reponse')).toBe(undefined);
      });
    });
  });

  describe('#formateReponse', function() {
    beforeEach(function() {
      vue = composant({ question: { score: 1, sous_type: 'prix_avec_centimes', reponses: [
        {
          intitule: '1,99',
          type_choix: 'bon'
        }
      ]}});
    });

    it('ne formatte pas la réponse si ce n\'est pas un prix avec centimes', function() {
      vue = composant({ question: { sous_type: 'numerique' } });
      const event = { target: { value: 'texte saisi' } };
      vue.vm.formateReponse(event);
      expect(vue.emitted('reponse')).toBe(undefined);
    });

    it("envoie la réponse formattée", function() {
      const event = { target: { value: '1,99' } };
      vue.vm.formateReponse(event);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: '1,99', succes: true, score: 1, scoreMax: 1 });
    });

    it("transforme le point en virgule", function() {
      const event = { target: { value: '1.99' } };
      vue.vm.formateReponse(event);
      expect(vue.emitted('reponse')[0][0].reponse).toEqual('1,99');
    });

    it("ajoute les 0 des décimaux", function() {
      const event = { target: { value: '1' } };
      vue.vm.formateReponse(event);
      expect(vue.emitted('reponse')[0][0].reponse).toEqual('1,00');
    });

    it("enlève le 0 du début", function() {
      const event = { target: { value: '01,7' } };
      vue.vm.formateReponse(event);
      expect(vue.emitted('reponse')[0][0].reponse).toEqual('1,70');
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

    it("a l'attribut inputmode défini sur null", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('inputmode')).toEqual(null);
    });
  });

  describe("quand il est d'un sous-type prix_avec_centimes", function () {
    beforeEach(function () {
      vue = composant({ question: { sous_type: 'prix_avec_centimes' } });
    });

    it("a l'attribut inputmode défini sur 'décimal'", function () {
      const input = vue.find('input[type=text]');
      expect(input.element.getAttribute('inputmode')).toEqual('decimal');
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
