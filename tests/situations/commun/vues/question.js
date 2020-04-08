import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueQuestion from 'commun/vues/question';
import { creeStore } from 'objets_trouves/modeles/store';
import { traduction } from 'commun/infra/internationalisation';

describe('La vue de la question', function () {
  let question;
  let store;
  let wrapper;
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.prototype.$traduction = traduction;
    question = { choix: [] };
    store = creeStore();
    question.illustration = 'palette';
    wrapper = shallowMount(VueQuestion, {
      propsData: {
        question
      },
      store,
      localVue
    });
  });

  it("affiche l'image", function () {
    expect(wrapper.contains('.question-illustration')).to.be(true);
    expect(wrapper.find('.question-illustration').attributes('src')).to.equal('palette');
  });

  it("n'affiche pas d'icône si il n'y a pas d'apps active", function () {
    expect(wrapper.contains('.icone-conteneur')).to.be(false);
  });

  it('affiche une icône si il y a une app active', function () {
    store.commit('configureActe', { apps: { agenda: { 0: { icone: 'icone-agenda' } } } });
    store.commit('afficheApp', 'agenda');

    expect(wrapper.contains('.icone-conteneur')).to.be(true);
    const icone = wrapper.find('.icone');
    expect(icone.classes('icone--agenda')).to.be(true);
    expect(icone.attributes('style')).to.equal('background-image: url(icone-agenda);');
  });

  it("n'affiche pas d'icône si l'app active est deverrouillage", function () {
    store.commit('configureActe', { apps: { deverrouillage: { 0: { icone: 'icone-deverrouillage' } } } });
    store.commit('afficheApp', 'deverrouillage');

    expect(wrapper.contains('.icone-conteneur')).to.be(false);
  });
});
