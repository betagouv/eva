import $ from 'jquery';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';
import SituationCommune, { ATTENTE_DEMARRAGE, DEMARRE } from 'commun/modeles/situation';

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

    vue = new VueRejoueConsigne(mockJoueurConsigne, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $, situation);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('passe en état lecture en cours', function () {
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(1);
  });

  it("à la fin de la lecture, repasse à l'état initial", function () {
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it('on peut lire la consigne plusieurs fois', function () {
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    vue.litConsigne($);
    mockJoueurConsigne.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it("rejoue aussi la consigne commune si la situation n'a pas encore demarre", function () {
    mockJoueurConsigne.joue = (joueConsigneCommune, cbFin) => {
      expect(joueConsigneCommune).to.be(true);
    };
    situation.modifieEtat(ATTENTE_DEMARRAGE);
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
  });

  it('ne rejoue pas la consigne commune si la situation a demarre', function () {
    mockJoueurConsigne.joue = (joueConsigneCommune, cbFin) => {
      expect(joueConsigneCommune).to.be(false);
    };
    vue.affiche('#pointInsertion', $, situation);
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
  });

  it('journalise un événement RejoueConsigne', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementRejoueConsigne);
      done();
    };
    vue.affiche('#pointInsertion', $, situation);
    vue.litConsigne($);
  });
});
