import jsdom from 'jsdom-global';

import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'tri/modeles/situation';
import VueChronometre from 'tri/vues/chronometre';

describe('Le chronometre', () => {
  let $;
  let situation;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation({ pieces: [], bacs: [] });
    vue = new VueChronometre(situation);
    vue.affiche('#pointInsertion', $);
  });

  it("sait s'afficher dans une page web", () => {
    expect($('#pointInsertion .chronometre-container').length).to.eql(1);
    expect($('#pointInsertion .aiguille-minute').length).to.eql(1);
    expect($('#pointInsertion .aiguille-seconde').length).to.eql(1);
    expect($('#pointInsertion .chronometre-container.actif').length).to.eql(0);
  });

  it("s'active seulement quand la situation est en etat DEMARRE", () => {
    situation.modifieEtat(DEMARRE);
    expect($('#pointInsertion .chronometre-container.actif').length).to.eql(1);
  });

  it('se stoppe seulement quand la situation est en etat FINI', () => {
    situation.modifieEtat(DEMARRE);
    expect($('#pointInsertion .chronometre-container.actif').length).to.eql(1);
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .chronometre-container.actif').length).to.eql(0);
  });
});
