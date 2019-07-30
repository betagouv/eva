import $ from 'jquery';
import VueTerminer from 'commun/vues/terminer.js';

describe('Affiche les éléments liés à la fin de la situation', function () {
  let vueTerminer;

  beforeEach(function () {
    $('body').append('<div id="magasin"></div>');
    vueTerminer = new VueTerminer();
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueTerminer.affiche('#magasin', $);
    expect($('.actions').length).to.equal(1);
  });

  it('affiche le message de succés', function () {
    vueTerminer.affiche('#magasin', $);
    expect($('.message-succes').length).to.equal(1);
  });

  it('affiche le bouton terminer', function () {
    vueTerminer.affiche('#magasin', $);
    expect($('.bouton-terminer').length).to.equal(1);
  });
});
