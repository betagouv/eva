import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueBoiteUtilisateur from 'commun/vues/boite_utilisateur';

describe('La boite utilisateur', function () {
  const registreUtilisateur = { consulte () {}, deconnecte () {} };
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
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
});
