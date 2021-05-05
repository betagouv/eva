import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Accueil, { CLE_ETAT_ACCUEIL, LARGEUR_BATIMENT, ESPACEMENT_BATIMENT, DECALAGE_INITIAL } from 'accueil/vues/accueil';
import BoiteUtilisateur from 'commun/vues/boite_utilisateur';
import AccesSituation from 'accueil/vues/acces_situation';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';
import { traduction } from 'commun/infra/internationalisation';
import { DECONNECTE } from 'accueil/modeles/store';

Vue.use(Vuex);

describe('La vue accueil', function () {
  let depotRessources;
  let store;
  let localVue;

  beforeEach(function () {
    window.localStorage.removeItem(CLE_ETAT_ACCUEIL);
    depotRessources = new class {
      fondAccueil () {
        return { src: '' };
      }

      personnage () {
        return { src: '' };
      }

      precedent () {
        return { src: '' };
      }

      suivant () {
        return { src: '' };
      }
    }();

    store = new Vuex.Store({
      state: {
        situations: [{}, {}],
        estConnecte: false,
        situationsFaites: [],
        etat: DECONNECTE
      }
    });
    localVue = createLocalVue();
    localVue.prototype.$depotRessources = depotRessources;
    localVue.prototype.$traduction = traduction;
  });

  it('affiche les composants', function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.findAllComponents(AccesSituation).length).toEqual(4);
    expect(wrapper.findComponent(FormulaireIdentification).exists()).toBe(true);
    expect(wrapper.findComponent(BoiteUtilisateur).exists()).toBe(true);
  });

  it("affiche le fond de l'accueil et le personnage", function () {
    depotRessources.fondAccueil = () => { return { src: 'image-fond' }; };
    depotRessources.personnage = () => { return { src: 'personnage' }; };

    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.fondAccueil).toEqual('url(image-fond)');
    expect(wrapper.vm.personnage).toEqual('personnage');
  });

  it('retourne les batiments', function () {
    store.state.situations = [{ chemin: '/', identifiant: 'test' }];
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.batiments.length).toEqual(3);
    expect(wrapper.vm.batiments[0]).toEqual({
      nom: '',
      identifiant: 'accueil'
    });
    expect(wrapper.vm.batiments[1]).toEqual({
      nom: 'accueil.commencer{}',
      chemin: '/',
      identifiant: 'test'
    });
    expect(wrapper.vm.batiments[2]).toEqual({
      nom: 'accueil.conclure',
      identifiant: 'fin',
      action: wrapper.vm.afficheEcranFin
    });
  });

  describe('niveauMax', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
    });

    it('1 au début', function () {
      store.state.situationsFaites = [];
      expect(wrapper.vm.niveauMax).toEqual(1);
    });

    it('2 une fois une situation faite', function () {
      store.state.situationsFaites = [''];
      expect(wrapper.vm.niveauMax).toEqual(2);
    });
  });

  it("donne le décalage a gauche d'une situation", function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.decalageGaucheBatiment(0)).toBe(DECALAGE_INITIAL);
    expect(wrapper.vm.decalageGaucheBatiment(1)).toBe(DECALAGE_INITIAL + LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    expect(wrapper.vm.decalageGaucheBatiment(2)).toBe(DECALAGE_INITIAL + (LARGEUR_BATIMENT + ESPACEMENT_BATIMENT) * 2);
  });

  it('donne le déplacement à gauche de la vue', function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(wrapper.vm.decalageGaucheVue(0)).toBe(0);
    expect(wrapper.vm.decalageGaucheVue(1)).toBe(LARGEUR_BATIMENT + ESPACEMENT_BATIMENT);
    expect(wrapper.vm.decalageGaucheVue(2)).toBe((LARGEUR_BATIMENT + ESPACEMENT_BATIMENT) * 2);
  });

  it("synchronise l'évaluation quand un utilisateur affiche l'accueil en étant connecté", function (done) {
    store.dispatch = (evenement) => {
      expect(evenement).toEqual('synchroniseEvaluation');
      done();
      return Promise.resolve();
    };
    store.state.estConnecte = true;
    shallowMount(Accueil, {
      localVue,
      store
    });
  });

  it("synchronise l'évaluation à la connexion", function (done) {
    let nombreDispatch = 0;
    store.dispatch = (evenement) => {
      expect(evenement).toEqual('synchroniseEvaluation');
      nombreDispatch++;
      return Promise.resolve();
    };
    store.state.estConnecte = false;
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    expect(nombreDispatch).toEqual(0);
    store.state.estConnecte = true;
    wrapper.vm.$nextTick(() => {
      expect(nombreDispatch).toEqual(1);
      done();
    });
  });

  it('assigne indexBatiment au niveau max aprés avoir chargé les situations', function () {
    store.state.estConnecte = true;
    store.state.situationsFaites = [''];
    store.dispatch = () => Promise.resolve();
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    wrapper.vm.introFaite = true;

    return Promise.resolve().then(() => {
      expect(wrapper.vm.indexBatiment).toBe(2);
    });
  });

  it('sauvegarde le niveau pour le prochain chargement', function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    wrapper.vm.indexBatiment = 2;
    wrapper.vm.sauvegardeEtatPourProchainChargement();
    const etat = JSON.parse(window.localStorage.getItem(CLE_ETAT_ACCUEIL));
    expect(etat.indexPrecedent).toEqual(2);
  });

  describe('recupereEtatDuPrecedentChargement', function () {
    it("lorsque aucune valeur n'est présente dans localStorage", function () {
      const wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
      const etatPrecedent = wrapper.vm.recupereEtatDuPrecedentChargement();
      expect(etatPrecedent.indexPrecedent).toBe(-0.5);
    });

    it("lorsqu'une valeur est présente dans localStorage", function () {
      const wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
      window.localStorage.setItem(CLE_ETAT_ACCUEIL, JSON.stringify({
        indexPrecedent: 4
      }));
      const etatPrecedent = wrapper.vm.recupereEtatDuPrecedentChargement();
      expect(etatPrecedent.indexPrecedent).toBe(4);
    });
  });

  describe('termine', function () {
    let wrapper;

    beforeEach(function () {
      store.state.situations = [{ nom: 'Inventaire' }];
      wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
    });

    it("faux lorsque toute les situations n'ont pas été faites", function () {
      wrapper.vm.indexBatiment = 1;
      expect(wrapper.vm.termine).toBe(false);
    });

    it('vraie lorsque toute les situations ont été faites', function () {
      wrapper.vm.indexBatiment = 2;
      expect(wrapper.vm.termine).toBe(true);
    });
  });

  describe('precedentDesactivee', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
    });

    it('vrai lorsque indexBatiment est à 0', function () {
      wrapper.vm.indexBatiment = 0;
      expect(wrapper.vm.precedentDesactivee).toBe(true);
    });

    it('faux lorsque indexBatiment est autre chose que 0', function () {
      wrapper.vm.indexBatiment = 3;
      expect(wrapper.vm.precedentDesactivee).toBe(false);
    });
  });

  describe('suivantDesactivee', function () {
    let wrapper;

    beforeEach(function () {
      wrapper = shallowMount(Accueil, {
        localVue,
        store
      });
    });

    it('vrai lorsque le niveauMax est atteint', function () {
      store.state.situationsFaites = [''];
      wrapper.vm.indexBatiment = 2;
      expect(wrapper.vm.suivantDesactivee).toBe(true);
    });

    it("faux lorsque les niveauMax n'est pas atteint", function () {
      store.state.situationsFaites = [''];
      wrapper.vm.indexBatiment = 1;
      expect(wrapper.vm.suivantDesactivee).toBe(false);
    });
  });

  it("fait passer l'affichage des batiments à 0 à la connexion", function (done) {
    store.dispatch = () => Promise.resolve();
    store.state.estConnecte = false;
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    store.state.estConnecte = true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.indexBatiment).toEqual(0);
      done();
    });
  });

  it("à la fin de l'intro, fait avancer l'index des batiments", function () {
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    wrapper.vm.indexBatiment = 0;
    wrapper.vm.finiIntro();
    expect(wrapper.vm.indexBatiment).toBe(1);
  });

  it("affiche l'écran de fin à l'appui du bouton conclure", function () {
    store.state.situations = [{ nom: 'Inventaire' }];
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    wrapper.vm.afficheEcranFin();
    expect(wrapper.vm.ecranFinAfficher).toEqual(true);
  });

  it('réinitialise les données a la déconnexion', function (done) {
    store.dispatch = () => Promise.resolve();
    store.state.estConnecte = true;
    const wrapper = shallowMount(Accueil, {
      localVue,
      store
    });
    wrapper.vm.ecranFinAfficher = true;
    wrapper.vm.indexBatiment = 1;
    store.state.estConnecte = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.ecranFinAfficher).toBe(false);
      expect(wrapper.vm.indexBatiment).toBe(-0.5);
      done();
    });
  });
});
