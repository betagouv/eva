import jsdom from 'jsdom-global';
import VueStop from 'commun/vues/stop';
import EvenementStop from 'commun/modeles/evenement_stop';

import i18next from 'i18next';
i18next.init({
  lng: 'fr',
  resources: {
  }
});

describe('vue Stop', function () {
  let vue;
  let $;
  let retourAccueil = false;
  let mockJournal;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    mockJournal = {
      enregistre () {}
    };
    vue = new VueStop('#magasin', $, mockJournal, () => {
      retourAccueil = true;
    });
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche();
    expect(document.querySelector('#magasin #stop').classList).to.not.contain('invisible');
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.affiche();

    $('#magasin #stop').click();
    expect($('#fenetre-modale').length).to.equal(1);
    expect($('label').text()).to.equal('situation.stop');
  });

  it("Enregistre l'événément et redirige vers l'accueil quand on confirme la modale", function (done) {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementStop);
      return Promise.resolve();
    };
    vue.clickSurOk().then(() => {
      expect(retourAccueil).to.equal(true);
      done();
    });
  });
});
