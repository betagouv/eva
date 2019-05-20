import Bac, { CHANGEMENT_ETAT_SURVOLE } from 'commun/modeles/bac';
import Piece from 'commun/modeles/piece';

describe('un bac', function () {
  it('connaît ses dimensions', function () {
    const bac = new Bac({ largeur: 20, hauteur: 30 });
    expect(bac.dimensions()).to.eql({ largeur: 20, hauteur: 30 });
  });

  it('connaît sa position', function () {
    const bac = new Bac({ x: 5, y: 10 });
    expect(bac.position()).to.eql({ x: 5, y: 10 });
  });

  it('peut être passé en état survolé', function () {
    const bac = new Bac({});
    expect(bac.etatSurvole()).to.be(false);
    bac.passeEnEtatSurvole();
    expect(bac.etatSurvole()).to.be(true);
  });

  it("l'état survolé peut être réinitialisé", function () {
    const bac = new Bac({});
    bac.passeEnEtatSurvole();
    expect(bac.etatSurvole()).to.be(true);
    bac.reinitialiseEtatSurvole();
    expect(bac.etatSurvole()).to.be(false);
  });

  it("notifie le changement d'état survolé", function () {
    let changementEtatSurvole = 0;
    const bac = new Bac({});
    bac.on(CHANGEMENT_ETAT_SURVOLE, () => {
      changementEtatSurvole++;
    });
    bac.passeEnEtatSurvole();
    expect(changementEtatSurvole).to.equal(1);
    bac.reinitialiseEtatSurvole();
    expect(changementEtatSurvole).to.equal(2);
  });

  it('sait si une pièce est parfaitement posé dessus', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 13, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).to.be(true);
  });

  it('sait si une pièce est posé dessus décalé vers la gauche', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 6, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).to.be(true);
  });

  it('sait si une pièce est posé dessus décalé vers la droite', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 17, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).to.be(true);
  });

  it("sait si une pièce n'est pas posé dessus", function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 5, y: 5 });
    expect(bac.contient(piece)).to.be(false);
  });

  it("sait si une autre pièce n'est pas posé dessus", function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 15, y: 45 });
    expect(bac.contient(piece)).to.be(false);
  });
});
