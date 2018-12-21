import { afficheMagasin } from '../../src/app/init.js';

let jsdom = require('jsdom-global');

describe('Le magasin', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>', { url: 'http://localhost' });
    $ = jQuery(window);
  });

  afterEach(function () {
    jsdom();
  });

  it("sait s'afficher dans une page web", function () {
    expect($('.etageres').length).to.equal(0);
    afficheMagasin('#magasin', $);
    expect($('#magasin .etageres').length).to.equal(1);
  });

  it("sait afficher un bouton pour saisir l'inventaire", function () {
    expect($('.affiche-saisie').length).to.equal(0);
    afficheMagasin('#magasin', $);
    expect($('#magasin .affiche-saisie').length).to.equal(1);
  });
});
