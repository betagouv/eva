import jsdom from 'jsdom-global';

import BarreDev from 'commun/vues/barre_dev';
import Situation, { DEMARRE, FINI } from 'commun/modeles/situation';

describe('la barre de developpement', () => {
  let $;
  let situation;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    vue = new BarreDev(situation);
    vue.affiche('#pointInsertion', $);
  });

  it('crée un conteneur', () => {
    expect($('#pointInsertion .barre-dev').length).to.eql(1);
  });

  it('affiche un bouton go', () => {
    expect($('#pointInsertion .barre-dev .bouton-go').length).to.eql(1);
  });

  it("l'appui sur le bouton passe la situation en DEMARRE", () => {
    $('#pointInsertion .bouton-go').click();
    expect(situation.etat()).to.eql(DEMARRE);
  });

  it('affiche un bouton fini', () => {
    expect($('#pointInsertion .barre-dev .bouton-fini').length).to.eql(1);
  });

  it("l'appui sur le bouton fini passe la situation en FINI", () => {
    $('#pointInsertion .bouton-fini').click();
    expect(situation.etat()).to.eql(FINI);
  });
});
