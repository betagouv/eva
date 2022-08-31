import { shallowMount } from '@vue/test-utils';
import RedactionNote from 'commun/vues/defi/redaction_note';

describe('Le composant RedactionNote', function () {
  function composant (props) {
    return shallowMount(RedactionNote, { props: props });
  }

  it('affiche une zone de saisie de texte', function () {
    const vue = composant({ question: {} });
    expect(vue.find('textarea').exists()).toBe(true);
  });

  it('affiche le placeholder', function () {
    const question = { reponse_placeholder: 'écrire ici' };
    const vue = composant({ question });
    const input = vue.find('textarea');
    expect(input.element.getAttribute('placeholder')).toEqual('écrire ici');
  });

  it('désactive la correction automatique', function () {
    const vue = composant({ question: {} });
    const input = vue.find('textarea');
    expect(input.element.getAttribute('spellCheck')).toEqual('false');
    expect(input.element.getAttribute('autocomplete')).toEqual('off');
    expect(input.element.getAttribute('autocapitalize')).toEqual('off');
    expect(input.element.getAttribute('autocorrect')).toEqual('off');
  });

  describe('peut être utilisé avec la propriété v-model', function () {
    it('envoie la réponse dans un événement input', function () {
      const vue = composant({ question: {} });
      const input = vue.find('textarea');
      const reponse = 'Une rédaction de plusieurs\nlignes\n\n';
      input.setValue(reponse);
      expect(vue.emitted('reponse')[0].length).toEqual(1);
      expect(vue.emitted('reponse')[0][0]).toEqual({ reponse: 'Une rédaction de plusieurs\nlignes' });
    });
  });
});
