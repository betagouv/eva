import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import VueAccueil from 'accueil/vues/accueil';
import AccesSituation from 'accueil/modeles/acces_situation';

import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

describe('La vue accueil', function () {
  let $;
  let depotRessources;
  let progression;
  let accesSituations;
  let registreUtilisateur;

  beforeEach(function () {
    jsdom('<div id="accueil"></div>');
    $ = jQuery(window);
    progression = { niveau () { } };
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      consulte () {}
    }();

    registreUtilisateur.progression = () => progression;
    registreUtilisateur.deconnecte = () => {};
    depotRessources = new class {
      fondAccueil () {
        return { src: '' };
      }

      personnages () {
        return { src: '' };
      }

      batimentSituation (identifiant) {
        return { src: identifiant };
      }

      progression () {
        return { src: 'progression' };
      }
    }();

    accesSituations = [
      new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc', niveauMinimum: 1 }),
      new AccesSituation({ nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz', niveauMinimum: 2 })
    ];
  });

  it('affiche un lien pour chaque situation', function () {
    const vueAccueil = new VueAccueil(accesSituations, registreUtilisateur, depotRessources);

    vueAccueil.affiche('#accueil', $);

    const $liensSituations = $('#accueil .acces-situations .acces-situation');
    expect($liensSituations.length).to.equal(2);
  });

  it("affiche le fond de l'accueil et les personnages", function () {
    depotRessources.fondAccueil = () => { return { src: 'image-fond' }; };
    depotRessources.personnages = () => { return { src: 'personnages' }; };

    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('.acces-situations').attr('style')).to.equal('background-image: url(image-fond);');
    expect($('.personnages').attr('style')).to.equal('background-image: url(personnages);');
  });

  it("affiche le formulaire d'identification et masque la déconnexion", function () {
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
    expect($('#accueil .boite-utilisateur').length).to.equal(0);
  });

  it("cache le formulaire d'identification si le nom est rempli et affiche la déconnexion", function () {
    registreUtilisateur.estConnecte = () => true;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(0);
    expect($('#accueil .boite-utilisateur').length).to.equal(1);
  });

  it("cache le formulaire d'identification une fois le nom rempli", function () {
    $.fx.off = true;
    let callbackChangementConnexion;
    registreUtilisateur.on = (_nom, callback) => {
      callbackChangementConnexion = callback;
    };
    registreUtilisateur.estConnecte = () => false;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
    registreUtilisateur.estConnecte = () => true;
    callbackChangementConnexion();
    expect($('#accueil #formulaire-identification').length).to.equal(0);
    expect($('#accueil .boite-utilisateur').length).to.equal(1);
  });

  it('affiche la progression dans le parc', function () {
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    progression.niveau = () => 42;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('.progression').attr('style')).to.equal('background-image: url(42);');
  });

  it('désactive les accès aux situations qui ne sont pas dans le niveau actuel', function () {
    progression.niveau = () => 1;
    const vueAccueil = new VueAccueil(accesSituations, registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    const $situation = $('#accueil .acces-situation');
    expect($situation.eq(0).text()).to.contain('ABC');
    expect($situation.eq(0).hasClass('desactivee')).to.be(false);
    expect($situation.eq(0).css('pointer-events')).to.equal('auto');

    expect($situation.eq(1).text()).to.contain('XYZ');
    expect($situation.eq(1).hasClass('desactivee')).to.be(true);
    expect($situation.eq(1).css('pointer-events')).to.equal('none');
  });

  it('permet de se déconnecter', function (done) {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.deconnecte = () => {
      done();
    };
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    $('.deconnexion').click();
  });

  it('actualise la progression quand on se déconnecte', function () {
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    progression.niveau = () => 2;
    registreUtilisateur.estConnecte = () => true;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);

    vueAccueil.affiche('#accueil', $);
    progression.niveau = () => 1;
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('.progression').attr('style')).to.equal('background-image: url(1);');
  });

  it("actualise l'accès aux situations quand on se déconnecte", function () {
    registreUtilisateur.estConnecte = () => true;
    progression.niveau = () => 2;
    const vueAccueil = new VueAccueil(accesSituations, registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    const $accesSituations = $('#accueil .acces-situation');
    expect($accesSituations.eq(1).hasClass('desactivee')).to.be(false);

    progression.niveau = () => 1;
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($accesSituations.eq(1).hasClass('desactivee')).to.be(true);
  });

  it("enlève la déconnexion lorsque l'utilisateur se déconnecte", function () {
    let callbackChangementConnexion;
    registreUtilisateur.on = (_nom, callback) => {
      callbackChangementConnexion = callback;
    };

    registreUtilisateur.estConnecte = () => true;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil .boite-utilisateur').length).to.equal(1);
    registreUtilisateur.estConnecte = () => false;
    callbackChangementConnexion();
    expect($('#accueil .boite-utilisateur').length).to.equal(0);
  });
});
