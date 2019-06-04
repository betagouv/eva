import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueTapis from 'controle/vues/tapis';
import MockDepotRessourcesControle from '../aides/mock_depot_ressources_controle';

describe('La vue du tapis', () => {
  let $;
  let situation;
  let vue;
  let depot;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation({});
    depot = new MockDepotRessourcesControle();
    vue = new VueTapis(situation, depot);
  });

  it("s'affiche à partir d'un point d'insertion", () => {
    depot.tapis = () => { return { src: 'image-tapis' }; };
    expect($('.tapis').length).to.equal(0);

    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').length).to.equal(1);
    expect($('#pointInsertion .tapis').css('background-image')).to.equal('url(image-tapis)');
    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.not.be.ok();
  });

  it("met en marche le tapis lorsque l'état est DEMARRE", () => {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.be.ok();
  });

  it("stoppe le tapis lorsque c'est fini", () => {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.not.be.ok();
  });
});
