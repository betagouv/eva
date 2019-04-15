import jsdom from 'jsdom-global';
import VueStop from 'commun/vues/stop';
import EvenementStop from 'commun/modeles/evenement_stop';
import Situation, { STOPPEE } from 'commun/modeles/situation';

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
  let situation;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    mockJournal = {
      enregistre () {}
    };
    situation = new Situation();
    vue = new VueStop(situation, mockJournal, () => {
      retourAccueil = true;
    });
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#magasin', $);
    expect(document.querySelector('#magasin #stop').classList).to.not.contain('invisible');
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.affiche('#magasin', $);

    $('#magasin #stop').click();
    expect($('#fenetre-modale').length).to.equal(1);
    expect($('label').text()).to.equal('situation.stop');
  });

  it("enregistre l'événement et redirige vers l'accueil quand on confirme la modale", function (done) {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementStop);
      return Promise.resolve();
    };
    vue.clickSurOk().then(() => {
      expect(situation.etat()).to.eql(STOPPEE);
      expect(retourAccueil).to.equal(true);
      done();
    });
  });
});
