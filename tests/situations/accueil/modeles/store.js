import { creeStore } from 'accueil/modeles/store';

describe("Le store de l'accueil", function () {
  let registreUtilisateur;

  beforeEach(function () {
    registreUtilisateur = {
      estConnecte () {},
      nom () {},
      on () {}
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
    const store = creeStore(registreUtilisateur);
    expect(store.state.estConnecte).to.eql(true);
    expect(store.state.nom).to.eql('Mon nom');
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
});
