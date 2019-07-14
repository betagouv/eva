import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';
import AccesSituation from 'accueil/modeles/acces_situation';

describe('La boite utilisateur', function () {
  let registreUtilisateur;
  let vueBoiteUtilisateur;
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      nom () {}
      deconnecte () {}
      nombreSituationsFaites () { return 1; }
    }();
    const accesSituations = [
      new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc', niveauMinimum: 1 }),
      new AccesSituation({ nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz', niveauMinimum: 2 })
    ];
    vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur, accesSituations);
  });

  it("affiche le nom de l'évalué·e et le bouton de déconnexion", function () {
    registreUtilisateur.nom = () => 'Jacques Adit';
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .nom-utilisateur').text().trim()).to.equal('Jacques Adit');
    expect($('#point-insertion .deconnexion').length).to.equal(1);
  });

  it('permet de se déconnecter', function (done) {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.deconnecte = () => {
      done();
    };
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    $('#point-insertion .deconnexion').click();
  });

  it("cache la boîte lorsque l'évalué·e se déconnecte", function () {
    registreUtilisateur.estConnecte = () => true;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(false);
    registreUtilisateur.estConnecte = () => false;
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", function () {
    registreUtilisateur.estConnecte = () => false;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("Mets à jour le nom de l'évalué·e à la connexion", function () {
    registreUtilisateur.estConnecte = () => false;
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.nom = () => 'Jacques Adit';
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .nom-utilisateur').text()).to.eql('Jacques Adit');
  });

  it("Affiche la progression de l'évalué·e", function () {
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .progression-utilisateur').text()).to.equal('1/2');
  });
});
