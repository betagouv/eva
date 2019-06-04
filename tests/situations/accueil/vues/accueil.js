import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueAccueil from 'accueil/vues/accueil';

describe('La vue accueil', function () {
  let $;
  const registreUtilisateur = { consulte () {} };

  beforeEach(function () {
    jsdom('<div id="accueil"></div>');
    $ = jQuery(window);
  });

  it('affiche un lien pour chaque situation', function () {
    const situations = [
      { nom: 'ABC', chemin: 'abc.html' },
      { nom: 'XYZ', chemin: 'xyz.html' }
    ];
    const vueAccueil = new VueAccueil(situations, registreUtilisateur);

    vueAccueil.affiche('#accueil', $);

    const $liens = $('#accueil a');
    expect($liens.length).to.equal(2);

    expect($liens.eq(0).text()).to.contain('ABC');
    expect($liens.eq(0).attr('href')).to.equal('abc.html');

    expect($liens.eq(1).text()).to.contain('XYZ');
    expect($liens.eq(1).attr('href')).to.equal('xyz.html');
  });

  it("affiche le formulaire d'identification", function () {
    const vueAccueil = new VueAccueil([], registreUtilisateur);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
  });
});
