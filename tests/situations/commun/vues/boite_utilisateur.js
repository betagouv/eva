import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';
import AccesSituation from 'accueil/modeles/acces_situation';

describe('La boite utilisateur', function () {
  let utilisateur;
  let vueBoiteUtilisateur;
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    utilisateur = new class extends EventEmitter {
      estConnecte () {}
      nom () {}
      deconnecte () {}
      progression () { return { fait: () => 1 }; }
    }();
    const accesSituations = [
      new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc', niveauMinimum: 1 }),
      new AccesSituation({ nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz', niveauMinimum: 2 })
    ];
    vueBoiteUtilisateur = new VueBoiteUtilisateur(utilisateur, accesSituations);
  });

  it("affiche le nom de l'évalué·e et le bouton de déconnexion", function () {
    utilisateur.nom = () => 'Jacques Adit';
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .nom-utilisateur').text().trim()).to.equal('Jacques Adit');
    expect($('#point-insertion .deconnexion').length).to.equal(1);
  });

  it('permet de se déconnecter', function (done) {
    utilisateur.estConnecte = () => true;
    utilisateur.deconnecte = () => {
      done();
    };
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    $('#point-insertion .deconnexion').click();
  });

  it("cache la boîte lorsque l'évalué·e se déconnecte", function () {
    utilisateur.estConnecte = () => true;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(false);
    utilisateur.estConnecte = () => false;
    utilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", function () {
    utilisateur.estConnecte = () => false;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("Mets à jour le nom de l'évalué·e à la connexion", function () {
    utilisateur.estConnecte = () => false;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    utilisateur.estConnecte = () => true;
    utilisateur.nom = () => 'Jacques Adit';
    utilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .nom-utilisateur').text()).to.eql('Jacques Adit');
  });

  it("Affiche la progression de l'évalué·e", function () {
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .progression-utilisateur').text()).to.equal('1/2');
  });
});
