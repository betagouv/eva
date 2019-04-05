/* global Event */

import VueAudio from 'commun/vues/audio';
import jsdom from 'jsdom-global';

describe('vue audio', function () {
  let vue;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    vue = new VueAudio('chemin_vers_le_fichier_son');
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

  it('sait jouer son fichier son', (done) => {
    vue.joue(() => {
      done();
    });
    expect(vue.element.src).to.equal('chemin_vers_le_fichier_son');
    setTimeout(() => {
      vue.element.dispatchEvent(new Event('ended'));
    });
  });

  it('passe directement a la suite si le son ne peut pas être jouée', function (done) {
    vue.element.play = () => {
      return new Promise(function (resolve, reject) {
        reject(new Error('Le fichier audio ne peut pas être joué'));
      });
    };

    vue.joue(() => {
      done();
    }, (erreur) => {
      expect(erreur).to.equal('Le fichier audio ne peut pas être joué');
    });
  });
});
