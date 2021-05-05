import $ from 'jquery';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';
import SituationCommune, { ATTENTE_DEMARRAGE, ENTRAINEMENT_DEMARRE, DEMARRE } from 'commun/modeles/situation';

describe('vue Rejoue Consigne', function () {
  let vue;
  let journal;
  let mockJoueurConsigne;
  let situation;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    journal = { enregistre () {} };
    situation = new SituationCommune();
    mockJoueurConsigne = new class {
      joue (unused, cbFin) {
        this.cbFin = cbFin;
      }

      finConsigne () {
        this.cbFin();
      }
    }();

    vue = new VueRejoueConsigne(situation, mockJoueurConsigne, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-lire-consigne').length).toEqual(1);
  });

  it('sait se cacher', function () {
    vue.affiche('#pointInsertion', $);
    vue.cache();
    expect($('#pointInsertion .bouton-lire-consigne').length).toEqual(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).toEqual(0);
  });

  it('passe en état lecture en cours', function () {
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
    expect($('#pointInsertion .bouton-lire-consigne').length).toEqual(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).toEqual(1);
  });

  it("à la fin de la lecture, repasse à l'état initial", function () {
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).toEqual(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).toEqual(0);
  });

  it('on peut lire la consigne plusieurs fois', function () {
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).toEqual(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).toEqual(0);
  });

  it("rejoue aussi la consigne commune si la situation n'a pas encore demarre", function () {
    mockJoueurConsigne.joue = (joueConsigneCommune, cbFin) => {
      expect(joueConsigneCommune).toBe(true);
    };
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
  });

  it("ne rejoue pas la consigne commune si l'entrainement a démarré", function () {
    mockJoueurConsigne.joue = (joueConsigneCommune, cbFin) => {
      expect(joueConsigneCommune).toBe(false);
    };
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(ENTRAINEMENT_DEMARRE);
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
  });

  it('ne rejoue pas la consigne commune si la situation a demarré', function () {
    mockJoueurConsigne.joue = (joueConsigneCommune, cbFin) => {
      expect(joueConsigneCommune).toBe(false);
    };
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
  });

  it('journalise un événement RejoueConsigne', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementRejoueConsigne);
      done();
    };
    vue.affiche('#pointInsertion', $);
    vue.litConsigne($);
  });
});
