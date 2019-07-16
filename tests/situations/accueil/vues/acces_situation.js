import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import VueAccesSituation from 'accueil/vues/acces_situation';
import AccesSituation from 'accueil/modeles/acces_situation';

import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';

describe('La vue pour accéder à une situation', function () {
  let $;
  let depotRessources;
  let utilisateur;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    depotRessources = new class {
      batimentSituation (identifiant) {
        return { src: identifiant };
      }
    }();
    utilisateur = new class extends EventEmitter {
      progression () {
        return { niveau () { } };
      }
    }();
  });

  it("sait s'afficher", function () {
    const accesSituation = new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' });
    const vueAccesSituation = new VueAccesSituation(accesSituation, depotRessources, utilisateur);

    vueAccesSituation.affiche('#pointInsertion', $);
    const $accesSituation = $('#pointInsertion .acces-situation');

    expect($accesSituation.text()).to.contain('ABC');
    expect($accesSituation.attr('href')).to.equal('abc.html');
    expect($accesSituation.hasClass('identifiant-abc')).to.be(true);
    expect($accesSituation.css('background-image')).to.equal('url(identifiant-abc)');
  });

  it("sait s'afficher en étant désactivé", function () {
    const accesSituation = new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' });
    accesSituation.estAccessible = () => false;
    const vueAccesSituation = new VueAccesSituation(accesSituation, depotRessources, utilisateur);
    vueAccesSituation.affiche('#pointInsertion', $);
    expect($('#pointInsertion .acces-situation').hasClass('desactivee')).to.be(true);
  });

  it('sait mettre à jour le status désactivé', function () {
    const accesSituation = new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' });
    const vueAccesSituation = new VueAccesSituation(accesSituation, depotRessources, utilisateur);
    vueAccesSituation.affiche('#pointInsertion', $);

    accesSituation.estAccessible = () => false;
    utilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#pointInsertion .acces-situation').hasClass('desactivee')).to.be(true);
  });
});
