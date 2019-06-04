import jsdom from 'jsdom-global';
import jQuery from 'jquery';

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

  it("le bouton go n'est actif que dans l'état ATTENTE_DEMARRAGE", () => {
    expect($('#pointInsertion .bouton-go').prop('disabled')).to.not.be.ok();
    situation.modifieEtat(DEMARRE);
    expect($('#pointInsertion .bouton-go').attr('disabled')).to.be.ok();
  });

  it('affiche un bouton fini', () => {
    expect($('#pointInsertion .barre-dev .bouton-fini').length).to.eql(1);
  });

  it("l'appui sur le bouton fini passe la situation en FINI", () => {
    $('#pointInsertion .bouton-fini').click();
    expect(situation.etat()).to.eql(FINI);
  });

  it("le bouton fini n'est pas actif dans l'état FINI", () => {
    expect($('#pointInsertion .bouton-fini').prop('disabled')).to.not.be.ok();
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .bouton-fini').attr('disabled')).to.be.ok();
  });
});
