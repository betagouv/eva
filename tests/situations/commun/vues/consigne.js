/* global Event */

import { VueConsigne } from 'commun/vues/consigne';
import jsdom from 'jsdom-global';

describe('vue consigne', function () {
  let vue;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    vue = new VueConsigne('chemin_vers_la_consigne');
    vue.affiche('#pointInsertion');
    vue.element.play = () => {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    };
  });

  it("sait s'insérer dans une page web ", function () {
    let element = document.querySelector('#pointInsertion #consigne');
    expect(element).to.eql(vue.element);
    expect(vue.element.tagName).to.equal('AUDIO');
  });

  it('sait jouer la consigne de démarrage', (done) => {
    vue.jouerConsigneDemarrage(() => {
      done();
    });
    expect(vue.element.src).to.equal('chemin_vers_la_consigne');
    setTimeout(() => {
      vue.element.dispatchEvent(new Event('ended'));
    });
  });

  it('affiche directement le bouton Go si la consigne ne peut pas être jouée', function (done) {
    vue.element.play = () => {
      return new Promise(function (resolve, reject) {
        reject(new Error('Le fichier audio ne peut pas être joué'));
      });
    };

    vue.jouerConsigneDemarrage(() => {
      done();
    }, (erreur) => {
      expect(erreur).to.equal('Le fichier audio ne peut pas être joué');
    });
  });
});
