import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueAccueil from 'accueil/vues/accueil';

describe('La vue accueil', function () {
  let $;
  let depotRessources;
  let progression;
  const registreUtilisateur = { on () {}, estConnecte () {}, consulte () {} };

  beforeEach(function () {
    jsdom('<div id="accueil"></div>');
    $ = jQuery(window);
    progression = { niveau () { } };
    registreUtilisateur.progression = () => progression;
    depotRessources = new class {
      fondAccueil () {
        return { src: 'image-fond' };
      }

      personnages () {
        return { src: 'personnages' };
      }

      batimentSituation (identifiant) {
        return { src: identifiant };
      }

      progression () {
        return { src: 'progression' };
      }
    }();
  });

  it('affiche un lien pour chaque situation', function () {
    const situations = [
      { nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' },
      { nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz' }
    ];
    const vueAccueil = new VueAccueil(situations, registreUtilisateur, depotRessources);

    vueAccueil.affiche('#accueil', $);

    const $liens = $('#accueil a');
    expect($liens.length).to.equal(2);

    expect($liens.eq(0).text()).to.contain('ABC');
    expect($liens.eq(0).attr('href')).to.equal('abc.html');
    expect($liens.eq(0).attr('class')).to.equal('situation identifiant-abc');
    expect($liens.eq(0).attr('style')).to.equal('background-image: url(identifiant-abc);');

    expect($liens.eq(1).text()).to.contain('XYZ');
    expect($liens.eq(1).attr('href')).to.equal('xyz.html');
    expect($liens.eq(1).attr('class')).to.equal('situation identifiant-xyz');
    expect($liens.eq(1).attr('style')).to.equal('background-image: url(identifiant-xyz);');
  });

  it("affiche le formulaire d'identification", function () {
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
  });

  it("cache le formulaire d'identification si le nom est rempli", function () {
    registreUtilisateur.estConnecte = () => true;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(0);
  });

  it("cache le formulaire d'identification une fois le nom rempli", function () {
    $.fx.off = true;
    let callbackChangementDeNom;
    registreUtilisateur.on = (_nom, callback) => {
      callbackChangementDeNom = callback;
    };
    registreUtilisateur.estConnecte = () => false;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('#accueil #formulaire-identification').length).to.equal(1);
    registreUtilisateur.estConnecte = () => true;
    callbackChangementDeNom();
    expect($('#accueil #formulaire-identification').length).to.equal(0);
  });

  it("affiche le fond de l'accueil et les personnages", function () {
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('.situations').attr('style')).to.equal('background-image: url(image-fond);');
    expect($('.personnages').attr('style')).to.equal('background-image: url(personnages);');
  });

  it('affiche la progression dans le parc', function () {
    depotRessources.progression = (niveau) => { return { src: niveau }; };
    progression.niveau = () => 42;
    const vueAccueil = new VueAccueil([], registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    expect($('.progression').attr('style')).to.equal('background-image: url(42);');
  });

  it('désactive les situations qui ne sont pas dans le niveau actuel', function () {
    const situations = [
      { nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' },
      { nom: 'XYZ', chemin: 'xyz.html', identifiant: 'identifiant-xyz' }
    ];
    progression.niveau = () => 1;
    const vueAccueil = new VueAccueil(situations, registreUtilisateur, depotRessources);
    vueAccueil.affiche('#accueil', $);
    const $situation = $('#accueil .situation');
    expect($situation.eq(0).text()).to.contain('ABC');
    expect($situation.eq(0).hasClass('desactivee')).to.be(false);

    expect($situation.eq(1).text()).to.contain('XYZ');
    expect($situation.eq(1).hasClass('desactivee')).to.be(true);
  });
});
