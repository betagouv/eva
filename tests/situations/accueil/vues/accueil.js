import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import VueAccueil from 'accueil/vues/accueil';
import AccesSituation from 'accueil/modeles/acces_situation';

describe('La vue accueil', function () {
  let $;
  let depotRessources;
  let accesSituations;
  let registreUtilisateur;

  beforeEach(function () {
    jsdom('<div id="accueil"></div>');
    $ = jQuery(window);
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      nom () {}
      niveauActuel () {}
      nombreSituationsFaites () {}
    }();

    registreUtilisateur.situationsFaites = () => ['tri'];
    registreUtilisateur.deconnecte = () => {};
    depotRessources = new class {
      fondAccueil () {
        return { src: '' };
      }

      personnages () {
        return { src: '' };
      }

      batimentSituation (identifiant) {
        return { src: identifiant };
      }

      progression () {
        return { src: 'progression' };
      }
    }();

    accesSituations = [
      new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc', niveauMinimum: 1 }),
      new AccesSituation({ nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz', niveauMinimum: 2 })
    ];
  });

  it('affiche un lien pour chaque situation', function () {
    const vueAccueil = new VueAccueil(accesSituations, registreUtilisateur, depotRessources);

    vueAccueil.affiche('#accueil', $);

    const $liensSituations = $('#accueil .acces-situations .acces-situation');
    expect($liensSituations.length).to.equal(2);
  });

  it("affiche le fond de l'accueil et les personnages", function () {
    depotRessources.fondAccueil = () => { return { src: 'image-fond' }; };
    depotRessources.personnages = () => { return { src: 'personnages' }; };

    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('.acces-situations').attr('style')).to.equal('background-image: url(image-fond);');
    expect($('.personnages').attr('style')).to.equal('background-image: url(personnages);');
  });

  it("affiche le formulaire d'identification", function () {
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
  });
});
