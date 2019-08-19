import $ from 'jquery';

import SituationCommune, { CHANGEMENT_ETAT, CHARGEMENT, ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE, LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, DEMARRE, FINI, STOPPEE } from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import VueCadre from 'commun/vues/cadre';
import DepotRessourcesCommune from 'commun/infra/depot_ressources_communes';
import chargeurs from '../../commun/aides/mock_chargeurs';

function uneClasseVue (callbackAffichage = () => {}) {
  return class {
    affiche (pointInsertion, jQuery) {
      callbackAffichage(pointInsertion, jQuery);
    }
  };
}

describe('Une vue du cadre', function () {
  let situation;
  let depotRessources;
  let journal;
  let uneVueCadre;

  beforeEach(function () {
    $(window).off();
    $('body').append('<div id="point-insertion"></div>');
    depotRessources = new DepotRessourcesCommune('sonConsigne.wav', chargeurs());
    situation = new SituationCommune();
    journal = { enregistre () {}, enregistreSituationFaite () {} };

    uneVueCadre = function (classeVue = uneClasseVue(), barreDev = false) {
      return new VueCadre(classeVue, situation, journal, depotRessources, barreDev);
    };

    return depotRessources.chargement();
  });

  it("Crée l'élément cadre", function () {
    const vueCadre = uneVueCadre();
    expect($('#point-insertion #cadre').length).to.equal(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#point-insertion #cadre.conteneur').length).to.equal(1);
  });

  it("Affiche une scene comme point d'insertion de la vue situation", function () {
    const vueCadre = uneVueCadre();
    expect($('#cadre .scene').length).to.equal(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#cadre .scene').length).to.equal(1);
  });

  it('affiche une situation donnée', function (done) {
    const VueSituation = uneClasseVue(function (pointInsertion, jQuery) {
      expect(pointInsertion).to.equal('.scene');
      expect(jQuery).to.equal($);
      done();
    });
    const vueCadre = uneVueCadre(VueSituation);
    vueCadre.affiche('#point-insertion', $);
  });

  it("affiche la barre d'action", function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $).then(() => {
      expect($('#cadre .actions').length).to.equal(1);
    });
  });

  it("affiche la vue chargement dans l'état CHARGEMENT", function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-chargement').length).to.equal(1);
  });

  it("affiche le bouton play dans l'état ATTENTE_DEMARRAGE", function () {
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .overlay .bouton-lire-consigne').length).to.equal(1);
  });

  it("affiche la consigne dans l'état LECTURE_CONSIGNE", function () {
    situation.modifieEtat(LECTURE_CONSIGNE);
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-lecture-en-cours').length).to.equal(1);
  });

  it("affiche le bouton go dans l'état CONSIGNE_ECOUTEE", function () {
    situation.modifieEtat(CONSIGNE_ECOUTEE);
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-go').length).to.equal(1);
  });

  it('affiche la vue terminer', function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $).then(() => {
      situation.emit(CHANGEMENT_ETAT, FINI);
      expect($('.actions').length).to.equal(2);
      expect($('.actions.invisible').length).to.equal(1);
    });
  });

  it('demande une confirmation pour quitter la page lorsque la situation est démarré', function () {
    const vueCadre = uneVueCadre();
    return vueCadre.affiche('#point-insertion', $).then(() => {
      [LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, DEMARRE].forEach((etat) => {
        situation.modifieEtat(etat);
        const event = $.Event('beforeunload');
        $(window).trigger(event);
        expect(event.isDefaultPrevented()).to.be(true);
      });
    });
  });

  it("ne demande pas une confirmation pour quitter la page lorsque la situation n'a pas démarré", function () {
    const vueCadre = uneVueCadre();
    return vueCadre.affiche('#point-insertion', $).then(() => {
      [CHARGEMENT, ERREUR_CHARGEMENT, FINI, ATTENTE_DEMARRAGE, STOPPEE].forEach((etat) => {
        situation.modifieEtat(etat);
        const event = $.Event('beforeunload');
        $(window).trigger(event);
        expect(event.isDefaultPrevented()).to.be(false);
      });
    });
  });

  it('désactive le click droit', function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);
    const contextmenu = $.Event('contextmenu');
    $('#cadre').trigger(contextmenu);
    expect(contextmenu.isDefaultPrevented()).to.be(true);
  });

  it("crée la barre d'outils de dev", function () {
    const vueCadre = uneVueCadre(uneClasseVue(), true);
    vueCadre.affiche('#point-insertion', $);

    expect($('.barre-dev').length).to.equal(1);
  });

  it("ne crée pas la barre d'outils de dev", function () {
    const vueCadre = uneVueCadre(uneClasseVue(), false);
    vueCadre.affiche('#point-insertion', $);

    expect($('.barre-dev').length).to.equal(0);
  });

  it("enregistre l'événement de démarrage", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementDemarrage);
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  it('enregistre la situation faite', function (done) {
    journal.enregistreSituationFaite = () => {
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });
});
