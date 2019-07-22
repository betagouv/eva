import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import VueProgression from 'accueil/vues/progression';

import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';

describe('La vue pour afficher la progression', function () {
  let $;
  let depotRessources;
  let utilisateur;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    depotRessources = new class {
      progression (identifiant) {
        return { src: identifiant };
      }
    }();
    utilisateur = new class extends EventEmitter {
      nbSituationsDebloquees () { }
    }();
  });

  it("sait s'afficher", function () {
    utilisateur.nbSituationsDebloquees = () => 42;
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    const vue = new VueProgression(depotRessources, utilisateur);

    vue.affiche('#pointInsertion', $);
    expect($('.progression').css('background-image')).to.equal('url(42)');
  });

  it('sait se rafraichir', function () {
    utilisateur.nbSituationsDebloquees = () => 42;
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    const vue = new VueProgression(depotRessources, utilisateur);

    vue.affiche('#pointInsertion', $);
    utilisateur.nbSituationsDebloquees = () => 1;
    utilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('.progression').css('background-image')).to.equal('url(1)');
  });
});
