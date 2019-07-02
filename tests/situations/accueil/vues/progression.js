import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import VueProgression from 'accueil/vues/progression';

import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

describe('La vue pour afficher la progression', function () {
  let $;
  let depotRessources;
  let registreUtilisateur;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    depotRessources = new class {
      progression (identifiant) {
        return { src: identifiant };
      }
    }();
    registreUtilisateur = new class extends EventEmitter {
      progression () {
        return { niveau () { } };
      }
    }();
  });

  it("sait s'afficher", function () {
    registreUtilisateur.progression = () => { return { niveau: () => 42 }; };
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    const vue = new VueProgression(depotRessources, registreUtilisateur);

    vue.affiche('#pointInsertion', $);
    expect($('.progression').css('background-image')).to.equal('url(42)');
  });

  it('sait se rafraichir', function () {
    registreUtilisateur.progression = () => { return { niveau: () => 42 }; };
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    const vue = new VueProgression(depotRessources, registreUtilisateur);

    vue.affiche('#pointInsertion', $);
    registreUtilisateur.progression = () => { return { niveau: () => 1 }; };
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('.progression').css('background-image')).to.equal('url(1)');
  });
});
