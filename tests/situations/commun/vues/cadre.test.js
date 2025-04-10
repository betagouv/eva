import $ from 'jquery';

import SituationCommune, {
  CHANGEMENT_ETAT, CHARGEMENT, ERREUR_CHARGEMENT,
  ATTENTE_DEMARRAGE,
  ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI,
  DEMARRE, FINI, RETOUR_ACCUEIL, STOPPEE
} from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import EvenementFinSituation from 'commun/modeles/evenement_fin_situation';
import EvenementEntrainementDemarrage from 'commun/modeles/evenement_entrainement_demarrage';
import VueCadre from 'commun/vues/cadre';
import DepotRessourcesCommune from 'commun/infra/depot_ressources_communes';
import chargeurs from '../../commun/aides/mock_chargeurs';
import { creeStore } from 'commun/modeles/store';

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
  let store;

  beforeEach(function () {
    store = creeStore();
    $(window).off();
    $('body').append('<div id="point-insertion"></div>');
    depotRessources = new DepotRessourcesCommune(chargeurs(), {}, {}, 'sonConsigne.mp3', 'sonConsigneTransition.mp3');
    situation = new SituationCommune();
    situation.identifiant = 'tri';
    journal = {
      enregistre () {},
      enregistreSituationFaite () {},
      attendFinEnregistrement () { return { finally () {} }; }
    };

    uneVueCadre = function (classeVue = uneClasseVue()) {
      return new VueCadre(classeVue, situation, journal, depotRessources, store);
    };
    return depotRessources.chargement();
  });

  it("Crée l'élément cadre", function () {
    const vueCadre = uneVueCadre();
    expect($('#point-insertion #cadre').length).toBe(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#point-insertion #cadre.conteneur').length).toBe(1);
  });

  it("Affiche une scene comme point d'insertion de la vue situation", function () {
    const vueCadre = uneVueCadre();
    expect($('#cadre .scene').length).toBe(0);

    vueCadre.affiche('#point-insertion', $);
    expect($('#cadre .scene').length).toBe(1);
  });

  it('affiche une situation donnée', function (done) {
    const VueSituation = uneClasseVue(function (pointInsertion, jQuery) {
      expect(pointInsertion).toBe('.scene');
      expect(jQuery).toBe($);
      done();
    });
    const vueCadre = uneVueCadre(VueSituation);
    vueCadre.affiche('#point-insertion', $);
  });

  it("affiche la barre d'action", function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $).then(() => {
      expect($('#cadre .actions').length).toBe(1);
    });
  });

  it("affiche la vue chargement dans l'état CHARGEMENT", function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .bouton-chargement').length).toBe(1);
  });

  it("affiche l'overlay d'introduction dans l'état ATTENTE_DEMARRAGE", function () {
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);

    expect($('#cadre .overlay .icone-description').length).toBe(1);
  });

  it('affiche la vue terminer', function () {
    const vueCadre = uneVueCadre();
    return vueCadre.affiche('#point-insertion', $).then(() => {
      situation.emit(CHANGEMENT_ETAT, RETOUR_ACCUEIL);
      expect($('#fenetre-modale').text()).toMatch(/situation.reussite/);
    });
  });

  it('demande une confirmation pour quitter la page lorsque la situation est démarré', function () {
    const vueCadre = uneVueCadre();
    return vueCadre.affiche('#point-insertion', $).then(() => {
      [ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, FINI, DEMARRE].forEach((etat) => {
        situation.modifieEtat(etat);
        const event = $.Event('beforeunload');
        $(window).trigger(event);
        expect(event.isDefaultPrevented()).toBe(true);
      });
    });
  });

  it("ne demande pas une confirmation pour quitter la page lorsque la situation n'a pas démarré", function () {
    const vueCadre = uneVueCadre();
    return vueCadre.affiche('#point-insertion', $).then(() => {
      [CHARGEMENT, ERREUR_CHARGEMENT, RETOUR_ACCUEIL, ATTENTE_DEMARRAGE, STOPPEE].forEach((etat) => {
        situation.modifieEtat(etat);
        const event = $.Event('beforeunload');
        $(window).trigger(event);
        expect(event.isDefaultPrevented()).toBe(false);
      });
    });
  });

  it('désactive le click droit', function () {
    const vueCadre = uneVueCadre();
    vueCadre.affiche('#point-insertion', $);
    const contextmenu = $.Event('contextmenu');
    $('#cadre').trigger(contextmenu);
    expect(contextmenu.isDefaultPrevented()).toBe(true);
  });

  it("enregistre l'événement de démarrage de l'entrainement", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementEntrainementDemarrage);
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, ENTRAINEMENT_DEMARRE);
  });

  it("enregistre l'événement de démarrage", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementDemarrage);
      expect(evenement.donnees()).toEqual({});
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  it("enregistre l'événement de démarrage avec une version s'il y en a une", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementDemarrage);
      expect(evenement.donnees()).toEqual({ version: 'une version'});
      done();
    };
    situation.version = 'une version';
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });

  it("enregistre l'événement de fin de situation puis attend la fin de tous les enregistrements", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementFinSituation);
    };
    journal.attendFinEnregistrement = () => {
      return {
        finally (cb) {
          cb.call();
          expect(vueCadre.situation.etat()).toBe(RETOUR_ACCUEIL);
          done();
        }
      };
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, FINI);
  });

  it("enregistre la situation faite au démarrage de l'entrainement", function (done) {
    journal.enregistreSituationFaite = () => {
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, ENTRAINEMENT_DEMARRE);
  });

  it('enregistre la situation faite', function (done) {
    journal.enregistreSituationFaite = () => {
      done();
    };
    const vueCadre = uneVueCadre();
    vueCadre.situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });
});
