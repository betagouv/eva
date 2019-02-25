/* global Event */
import jsdom from 'jsdom-global';
import { VueGo } from 'commun/vues/go.js';

describe('vue Go', function () {
  let vue;
  let overlay;
  let boutonGo;
  let boutonDemarrerConsigne;
  let mockVueConsigne = {
    jouerConsigneDemarrage () {}
  };
  let mockJournal;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    mockJournal = {
      enregistreDemarrage () {}
    };
    vue = new VueGo('#magasin', mockVueConsigne, mockJournal);
    overlay = document.querySelector('#magasin #overlay-go');
    boutonGo = overlay.querySelector('#go');
    boutonDemarrerConsigne = overlay.querySelector('#demarrer-consigne');
  });

  it('affiche un bouton "lire la consigne"', function () {
    expect(overlay.classList).to.contain('overlay');

    vue.afficher();
    expect(overlay.classList).to.not.contain('invisible');
    expect(boutonDemarrerConsigne.classList).to.not.contain('invisible');
  });

  it('démarre la lecture de la consigne quand on appuie sur le bouton', function (done) {
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      done();
    };
    vue.afficher();

    boutonDemarrerConsigne.dispatchEvent(new Event('click'));

    expect(boutonDemarrerConsigne.classList).to.contain('invisible');
  });

  it('affiche un overlay pendant la lecture de la consigne', function () {
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(overlay.classList).to.not.contain('invisible');
    };
    vue.afficher();

    expect(overlay.classList).to.not.contain('invisible');
  });

  it('affiche un bouton GO à la fin de la lecture de la consigne', function () {
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(boutonGo.classList).to.contain('invisible');
      actionFinConsigne();
    };
    vue.afficher();
    boutonDemarrerConsigne.dispatchEvent(new Event('click'));

    expect(boutonGo.classList).to.not.contain('invisible');
  });

  it("masque l'overlay et le bouton une fois le jeu démarré", function () {
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(boutonGo.classList).to.contain('invisible');
      actionFinConsigne();
    };
    vue.afficher();

    boutonGo.dispatchEvent(new Event('click'));

    expect(overlay.classList).to.contain('invisible');
  });

  it("journalise l'événement lorsque le jeu est démarré", function (done) {
    mockJournal.enregistreDemarrage = done;
    vue.afficher();

    boutonGo.dispatchEvent(new Event('click'));
  });
});
