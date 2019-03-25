/* global Event */
import jsdom from 'jsdom-global';
import { VueGo } from 'commun/vues/go.js';

describe('vue Go', function () {
  let vue;
  let mockVueConsigne = {
    jouerConsigneDemarrage () {}
  };
  let mockJournal;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    mockJournal = {
      enregistreDemarrage () {}
    };
    vue = new VueGo(mockVueConsigne, mockJournal);
  });

  it('affiche un bouton "lire la consigne" mais pas le bouton "go" au démarrage', function () {
    vue.affiche('#pointInsertion');

    const overlay = document.querySelector('#pointInsertion #overlay-go');
    expect(overlay.classList).to.contain('overlay');

    const boutonDemarrerConsigne = overlay.querySelector('#demarrer-consigne');
    expect(boutonDemarrerConsigne.classList).to.not.contain('invisible');

    const boutonGo = overlay.querySelector('#go');
    expect(boutonGo.classList).to.contain('invisible');
  });

  it('démarre la lecture de la consigne quand on appuie sur le bouton', function (done) {
    vue.affiche('#pointInsertion');

    const boutonDemarrerConsigne = document.querySelector('#demarrer-consigne');
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(boutonDemarrerConsigne.classList).to.contain('invisible');
      done();
    };

    boutonDemarrerConsigne.dispatchEvent(new Event('click'));
  });

  it('affiche un overlay pendant la lecture de la consigne', function () {
    vue.affiche('#pointInsertion');

    const overlay = document.querySelector('#overlay-go');
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(overlay.classList).to.not.contain('invisible');
    };

    const boutonDemarrerConsigne = document.querySelector('#demarrer-consigne');
    boutonDemarrerConsigne.dispatchEvent(new Event('click'));

    expect(overlay.classList).to.not.contain('invisible');
  });

  it('affiche un bouton GO à la fin de la lecture de la consigne', function () {
    vue.affiche('#pointInsertion');

    const boutonGo = document.querySelector('#go');
    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect(boutonGo.classList).to.contain('invisible');
      actionFinConsigne();
    };
    const boutonDemarrerConsigne = document.querySelector('#demarrer-consigne');
    boutonDemarrerConsigne.dispatchEvent(new Event('click'));

    expect(boutonGo.classList).to.not.contain('invisible');
  });

  it("masque l'overlay et le bouton une fois le jeu démarré", function () {
    vue.affiche('#pointInsertion');

    const boutonGo = document.querySelector('#overlay-go #go');

    boutonGo.dispatchEvent(new Event('click'));

    const overlay = document.querySelector('#overlay-go');
    expect(overlay.classList).to.contain('invisible');
  });

  it("journalise l'événement lorsque le jeu est démarré", function (done) {
    mockJournal.enregistreDemarrage = done;

    vue.affiche('#pointInsertion');

    document.querySelector('#go').dispatchEvent(new Event('click'));
  });
});
