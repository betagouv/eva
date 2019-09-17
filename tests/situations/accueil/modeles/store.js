import { creeStore } from 'accueil/modeles/store';

describe("Le store de l'accueil", function () {
  let registreUtilisateur;

  beforeEach(function () {
    registreUtilisateur = {
      estConnecte () {},
      nom () {},
      on () {},
      situationsFaites () {}
    };
  });

  it("s'initialise a partir du registre utilisateur", function () {
    registreUtilisateur.estConnecte = () => false;
    registreUtilisateur.nom = () => undefined;
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.nom).to.eql(undefined);
  });

  it('initialise son état connecté a partir du registre utilisateur', function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).to.eql(true);
    expect(store.state.nom).to.eql('Mon nom');
    expect(store.state.situationsFaites).to.eql([1]);
  });

  it("réinitilise les propriétés de l'évalué·e a la déconnexion", function () {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Mon nom';
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    store.commit('deconnecte');
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.nom).to.eql('');
    expect(store.state.situationsFaites.length).to.eql(0);
    expect(store.state.situations.length).to.eql(0);
  });

  it('initialise à la connexion', function () {
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    store.commit('connecte', 'nom évalué');
    expect(store.state.nom).to.equal('nom évalué');
    expect(store.state.situationsFaites.length).to.eql(0);
  });

  it('mets à jour les situations accessible', function () {
    const store = creeStore(registreUtilisateur);
    store.commit('metsAJourSituations', [1, 2]);
    expect(store.state.situations.length).to.eql(2);
  });

  it("mets à jour l'état connecte lorsque le registre change d'état", function () {
    let callback;
    registreUtilisateur.on = (_, cb) => { callback = cb; };
    const store = creeStore(registreUtilisateur);
    registreUtilisateur.estConnecte = () => true;
    callback();
    expect(store.state.estConnecte).to.eql(true);
    registreUtilisateur.estConnecte = () => false;
    callback();
    expect(store.state.estConnecte).to.eql(false);
    expect(store.state.nom).to.eql('');
  });

  it('recupère le niveau actuel', function () {
    registreUtilisateur.situationsFaites = () => [1];
    const store = creeStore(registreUtilisateur);
    expect(store.getters.niveauActuel).to.eql(2);
  });

  it('sait récupérer les situations depuis le serveur', function () {
    registreUtilisateur.urlEvaluation = () => '/evaluation';
    const fetch = (url) => Promise.resolve({
      json: () => {
        const situation = { nom_technique: 'nom_technique', libelle: 'libelle' };
        return { situations: [situation] };
      }
    });
    const store = creeStore(registreUtilisateur, fetch);
    return store.dispatch('synchroniseSituations').then(() => {
      const situationAttendue = {
        identifiant: 'nom_technique',
        nom: 'libelle',
        chemin: 'nom_technique.html',
        niveauMinimum: 1
      };
      expect(store.state.situations).to.eql([situationAttendue]);
    });
  });
});
