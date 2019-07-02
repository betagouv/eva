import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';
import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';

describe('La boite utilisateur', function () {
  let registreUtilisateur;
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      consulte () {}
      deconnecte () {}
    }();
  });

  it("affiche le nom de l'évalué·e et le bouton de déconnexion", function () {
    registreUtilisateur.consulte = () => 'Jacques Adit';
    const vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur);
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion').text().trim()).to.equal('Jacques Adit');
    expect($('#point-insertion .deconnexion').length).to.equal(1);
  });

  it('permet de se déconnecter', function (done) {
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.deconnecte = () => {
      done();
    };
    const vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur);
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    $('#point-insertion .deconnexion').click();
  });

  it("cache la boîte lorsque l'évalué·e se déconnecte", function () {
    registreUtilisateur.estConnecte = () => true;
    const vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur);
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(false);
    registreUtilisateur.estConnecte = () => false;
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("la boîte est cachée lorsque l'évalué·e est déconnecté·e", function () {
    registreUtilisateur.estConnecte = () => false;
    const vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur);
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    expect($('#point-insertion .boite-utilisateur').hasClass('invisible')).to.eql(true);
  });

  it("Mets à jour le nom de l'évalué·e à la connexion", function () {
    registreUtilisateur.estConnecte = () => false;
    const vueBoiteUtilisateur = new VueBoiteUtilisateur(registreUtilisateur);
    vueBoiteUtilisateur.affiche('#point-insertion', $);
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.consulte = () => 'Jacques Adit';
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#point-insertion .nom-utilisateur').text()).to.eql('Jacques Adit');
  });
});
