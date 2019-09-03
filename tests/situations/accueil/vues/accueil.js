import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Accueil from 'accueil/vues/accueil';
import AccesSituation from 'accueil/vues/acces_situation';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';
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

      personnage () {
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
    expect(wrapper.contains(FormulaireIdentification)).to.be(true);
    expect(wrapper.contains(BoiteUtilisateur)).to.be(true);
  });

  it("affiche le fond de l'accueil et le personnage", function () {
    depotRessources.fondAccueil = () => { return { src: 'image-fond' }; };
    depotRessources.personnage = () => { return { src: 'personnage' }; };

    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.fondAccueil).to.eql('url(image-fond)');
    expect(wrapper.vm.personnage).to.eql('personnage');
  });

  it("donne le décalage a gauche d'une situation", function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.decalageGaucheBatiment(0)).to.equal(298.5);
    expect(wrapper.vm.decalageGaucheBatiment(1)).to.equal(298.5 + 411 + 195.75);
    expect(wrapper.vm.decalageGaucheBatiment(2)).to.equal(298.5 + (411 + 195.75) * 2);
  });

  it('donne le déplacement à gauche de la vue', function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.decalageGaucheVue(1)).to.equal(0);
    expect(wrapper.vm.decalageGaucheVue(2)).to.equal(411 + 195.75);
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
