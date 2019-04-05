import jsdom from 'jsdom-global';
import VueConsigne from 'commun/vues/consigne';
import Situation, { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';

describe('vue consigne', function () {
  let vue;
  let $;
  let situation;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new class extends Situation {
      constructor () {
        super();
        this.consigneAudio = 'chemin_vers_la_consigne';
      }
    }();
    vue = new VueConsigne(situation);
    vue.audio.play = () => Promise.resolve();
  });

  it("cree l'élément audio de la consigne", () => {
    vue.affiche('#pointInsertion', $);
    const audio = document.querySelector('#pointInsertion audio');
    expect(audio).to.eql(vue.audio);
    expect(vue.audio.src).to.equal('chemin_vers_la_consigne');
  });

  it("change l'état a CONSIGNE_ECOUTEE une fois terminé", () => {
    vue.affiche('#pointInsertion', $);
    $(vue.audio).trigger('ended');
    expect(situation.etat()).to.eql(CONSIGNE_ECOUTEE);
  });

  it("passe  directement a l'état CONSIGNE_ECOUTEE si la consigne ne peut pas être jouée", (done) => {
    vue.audio.play = () => {
      return Promise.reject(new Error('Le fichier audio ne peut pas être joué'));
    };
    vue.affiche('#pointInsertion', $).then(() => {
      expect(situation.etat()).to.eql(CONSIGNE_ECOUTEE);
      done();
    });
  });
});
