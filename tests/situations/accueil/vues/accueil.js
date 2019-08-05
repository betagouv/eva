import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Accueil from 'accueil/vues/accueil';
import AccesSituation from 'accueil/vues/acces_situation';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';
import Progression from 'accueil/vues/progression';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';

describe('La vue accueil', function () {
  let depotRessources;
  let store;
  let localVue;

  beforeEach(function () {
    depotRessources = new class {
      fondAccueil () {
        return { src: '' };
      }

      personnages () {
        return { src: '' };
      }
    }();

    store = new Vuex.Store({
      state: {
        situations: [{}, {}],
        estConnecte: false
      }
    });
    localVue = createLocalVue();
    localVue.prototype.depotRessources = depotRessources;
  });

  it('affiche les composants', function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.findAll(AccesSituation).length).to.eql(2);
    expect(wrapper.contains(Progression)).to.be(true);
    expect(wrapper.contains(FormulaireIdentification)).to.be(true);
    expect(wrapper.contains(BoiteUtilisateur)).to.be(true);
  });

  it("affiche le fond de l'accueil et les personnages", function () {
    depotRessources.fondAccueil = () => { return { src: 'image-fond' }; };
    depotRessources.personnages = () => { return { src: 'personnages' }; };

    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.fondAccueil).to.eql('url(image-fond)');
    expect(wrapper.vm.personnages).to.eql('url(personnages)');
  });

  it("synchronise les situations quand un utilisateur affiche l'accueil en étant connecté", function (done) {
    store.dispatch = (evenement) => {
      expect(evenement).to.eql('synchroniseSituations');
      done();
    };
    store.state.estConnecte = true;
    shallowMount(Accueil, {
      localVue,
      store
    });
  });

  it('synchronise les situations à la connexion', function () {
    let nombreDispatch = 0;
    store.dispatch = (evenement) => {
      expect(evenement).to.eql('synchroniseSituations');
      nombreDispatch++;
    };
    store.state.estConnecte = false;
    shallowMount(Accueil, {
      localVue,
      store
    });
    expect(nombreDispatch).to.eql(0);
    store.state.estConnecte = true;
    expect(nombreDispatch).to.eql(1);
  });
});
