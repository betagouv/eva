import $ from 'jquery';
import VueAide from 'commun/vues/aide';

describe('vue bouton aide', function () {
  let vue;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    vue = new VueAide();
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('#point-insertion .bouton-aide').length).to.eql(1);
  });
});
