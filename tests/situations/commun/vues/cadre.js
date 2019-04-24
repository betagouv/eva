import jsdom from 'jsdom-global';

import SituationCommune, { CHANGEMENT_ETAT, CHARGEMENT, ERREUR_CHARGEMENT, ATTENTE_DEMARRAGE, LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, DEMARRE, FINI, STOPPEE } from 'commun/modeles/situation';
import VueCadre from 'commun/vues/cadre';
import MockAudio from '../../commun/aides/mock_audio';

function uneVue (callbackAffichage = () => {}) {
  return { affiche: callbackAffichage };
}

describe('Une vue du cadre', function () {
  let $;
  let situation;
  let chargeurRessources;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    chargeurRessources = { chargement: () => Promise.resolve() };
    situation = new class extends SituationCommune {
      constructor () {
        super();
        this.audios = {
          consigne: new MockAudio()
        };
      }
    }();
  });

  it("Crée l'élément cadre", function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    expect($('#point-insertion #cadre').length).to.equal(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#point-insertion #cadre.conteneur').length).to.equal(1);
  });

  it("Affiche une scene comme point d'insertion de la vue situation", function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    expect($('#cadre .scene').length).to.equal(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#cadre .scene').length).to.equal(1);
  });

  it('affiche une situation donnée', function (done) {
    const vueSituation = uneVue(function (pointInsertion, jQuery) {
      expect(pointInsertion).to.equal('.scene');
      expect(jQuery).to.equal($);
      done();
    });
    const vueCadre = new VueCadre(vueSituation, situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);
  });

  it("affiche la barre d'action", function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .actions').length).to.equal(1);
  });

  it("affiche la vue chargement dans l'état CHARGEMENT", function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-chargement').length).to.equal(1);
  });

  it("affiche le bouton play dans l'état ATTENTE_DEMARRAGE", function () {
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-lire-consigne-demarrage').length).to.equal(1);
  });

  it("affiche la consigne dans l'état LECTURE_CONSIGNE", function () {
    situation.modifieEtat(LECTURE_CONSIGNE);
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-lecture-en-cours').length).to.equal(1);
  });

  it("affiche le bouton go dans l'état CONSIGNE_ECOUTEE", function () {
    situation.modifieEtat(CONSIGNE_ECOUTEE);
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-go').length).to.equal(1);
  });

  it('affiche la vue terminer', function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);
    situation.emit(CHANGEMENT_ETAT, FINI);
    expect($('.actions').length).to.equal(2);
    expect($('.actions.invisible').length).to.equal(1);
  });

  it('demande une confirmation pour quitter la page lorsque la situation est démarré', function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);
    [LECTURE_CONSIGNE, CONSIGNE_ECOUTEE, DEMARRE].forEach((etat) => {
      situation.modifieEtat(etat);
      const event = $.Event('beforeunload');
      $(window).trigger(event);
      expect(event.isDefaultPrevented()).to.be.ok();
    });
  });

  it("ne demande pas une confirmation pour quitter la page lorsque la situation n'a pas démarré", function () {
    const vueCadre = new VueCadre(uneVue(), situation, {}, chargeurRessources);
    vueCadre.affiche('#point-insertion', $);
    [CHARGEMENT, ERREUR_CHARGEMENT, FINI, ATTENTE_DEMARRAGE, STOPPEE].forEach((etat) => {
      situation.modifieEtat(etat);
      const event = $.Event('beforeunload');
      $(window).trigger(event);
      expect(event.isDefaultPrevented()).to.not.be.ok();
    });
  });
});
