import $ from 'jquery';

import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueTapis from 'controle/vues/tapis';
import MockDepotRessourcesControle from '../aides/mock_depot_ressources_controle';

describe('La vue du tapis', function () {
  let situation;
  let vue;
  let depot;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation({});
    depot = new MockDepotRessourcesControle();
    vue = new VueTapis(situation, depot);
  });

  it("s'affiche à partir d'un point d'insertion", function () {
    depot.tapis = () => { return { src: 'image-tapis' }; };
    expect($('.tapis').length).toBe(0);

    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').length).toBe(1);
    expect($('#pointInsertion .tapis').css('background-image')).toBe('url(image-tapis)');
    expect($('#pointInsertion .tapis').hasClass('en-marche')).toBe(false);
  });

  it("met en marche le tapis lorsque l'état est DEMARRE", function () {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').hasClass('en-marche')).toBe(true);
  });

  it("stoppe le tapis lorsque c'est fini", function () {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .tapis').hasClass('en-marche')).not.toBe(true);
  });
});
