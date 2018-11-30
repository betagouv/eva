import { afficheMagasin } from '../../src/app/init.js';

let jsdom = require('jsdom-global');

describe('Le magasin', function () {
  let $;

  before(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
  });

  after(function () {
    jsdom();
  });

  it("sait s'afficher dans une page web", function () {
    expect($('.stock').length).to.equal(0);
    afficheMagasin('#magasin', $);
    expect($('#magasin .stock').length).to.equal(1);
  });
});
