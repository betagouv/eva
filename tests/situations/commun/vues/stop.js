import jsdom from 'jsdom-global';
import { VueStop } from 'commun/vues/stop.js';

describe('vue Stop', function () {
  let vue;
  let $;
  let retourAccueil = false;
  let mockJournal;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    mockJournal = {
      enregistreStop () {}
    };
    vue = new VueStop('#magasin', $, mockJournal, () => {
      retourAccueil = true;
    });
  });

  it("sait s'insérer dans une page web", function () {
    vue.afficher();
    expect(document.querySelector('#magasin #stop').classList).to.not.contain('invisible');
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.afficher();

    $('#magasin #stop').click();
    expect($('#fenetre-modale').length).to.equal(1);
    expect($('label').text()).to.equal('Voulez vous vraiment quitter la mission ?');
  });

  it("Redirige vers l'accueil quand on confirme la modale", function () {
    vue.afficher();
    $('#magasin #stop').click();
    $('#OK-modale').click();

    expect(retourAccueil).to.equal(true);
  });

  it("Enregistre l'événément quand on confirme la modale", function (done) {
    mockJournal.enregistreStop = done;
    vue.afficher();
    $('#magasin #stop').click();
    $('#OK-modale').click();
  });
});
