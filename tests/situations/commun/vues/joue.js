import jsdom from 'jsdom-global';

import Situation, { LECTURE_CONSIGNE, CONSIGNE_ECOUTEE } from 'commun/modeles/situation';
import Joue from 'commun/vues/joue';
import { traduction } from 'commun/infra/internationalisation';

describe('la vue joue', () => {
  let situation;
  let $;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    vue = new Joue(situation);
    vue.affiche('#pointInsertion', $);
  });

  it('affiche les informations', () => {
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-centre.bouton-lire-consigne-demarrage').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.ecouter-consigne'));
  });

  it("au click, change l'état à LECTURE_CONSIGNE", () => {
    vue.click();
    expect(situation.etat()).to.eql(LECTURE_CONSIGNE);
  });

  it("permet de passer directement à l'état CONSIGNE_ECOUTEE", function () {
    const $overlay = $('.overlay');

    const appuiSurS = $.Event('keydown');
    appuiSurS.which = 'S'.charCodeAt();
    $overlay.trigger(appuiSurS);

    expect(situation.etat()).to.eql(CONSIGNE_ECOUTEE);
  });
});
