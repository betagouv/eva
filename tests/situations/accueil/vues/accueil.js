import jsdom from 'jsdom-global';

import { VueAccueil } from 'accueil/vues/accueil.js';

describe('La vue accueil', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="accueil"></div>');
    $ = jQuery(window);
  });

  it('affiche un lien pour chaque situation', function () {
    const situations = [
      { nom: 'ABC', chemin: 'abc.html' },
      { nom: 'XYZ', chemin: 'xyz.html' }
    ];
    const vueAccueil = new VueAccueil(situations);

    vueAccueil.affiche('#accueil', $);

    const $liens = $('#accueil a');
    expect($liens.length).to.equal(2);

    expect($liens.eq(0).text()).to.equal('ABC');
    expect($liens.eq(0).attr('href')).to.equal('abc.html');

    expect($liens.eq(1).text()).to.equal('XYZ');
    expect($liens.eq(1).attr('href')).to.equal('xyz.html');
  });
});
