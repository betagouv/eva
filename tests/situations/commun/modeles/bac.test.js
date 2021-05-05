import Bac, { CHANGEMENT_ETAT_SURVOLE } from 'commun/modeles/bac';
import Piece from 'commun/modeles/piece';

describe('un bac', function () {
  it('connaît ses dimensions', function () {
    const bac = new Bac({ largeur: 20, hauteur: 30 });
    expect(bac.dimensions()).toEqual({ largeur: 20, hauteur: 30 });
  });

  it('connaît sa position', function () {
    const bac = new Bac({ x: 5, y: 10 });
    expect(bac.position()).toEqual({ x: 5, y: 10 });
  });

  it('sait quel catégorie de pièces accueillir', function () {
    const bac = new Bac({ categorie: true });
    expect(bac.categorie()).toBe(true);
  });

  it('sait si la pièce correspond à sa catégorie', function () {
    const bac = new Bac({ categorie: false });
    const piece = new Piece({ categorie: false });
    expect(bac.correspondALaCategorie(piece)).toBe(true);
  });

  it('sait si la pièce ne correspond pas à sa catégorie', function () {
    const bac = new Bac({ categorie: true });
    const piece = new Piece({ categorie: false });
    expect(bac.correspondALaCategorie(piece)).toBe(false);
  });

  it('peut être passé en état survolé', function () {
    const bac = new Bac({});
    expect(bac.etatSurvole()).toBe(false);
    bac.passeEnEtatSurvole();
    expect(bac.etatSurvole()).toBe(true);
  });

  it("l'état survolé peut être réinitialisé", function () {
    const bac = new Bac({});
    bac.passeEnEtatSurvole();
    expect(bac.etatSurvole()).toBe(true);
    bac.reinitialiseEtatSurvole();
    expect(bac.etatSurvole()).toBe(false);
  });

  it("notifie le changement d'état survolé", function () {
    let changementEtatSurvole = 0;
    const bac = new Bac({});
    bac.on(CHANGEMENT_ETAT_SURVOLE, () => {
      changementEtatSurvole++;
    });
    bac.passeEnEtatSurvole();
    expect(changementEtatSurvole).toBe(1);
    bac.reinitialiseEtatSurvole();
    expect(changementEtatSurvole).toBe(2);
  });

  it('sait si une pièce est parfaitement posé dessus', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 13, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).toBe(true);
  });

  it('sait si une pièce est posé dessus décalé vers la gauche', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 6, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).toBe(true);
  });

  it('sait si une pièce est posé dessus décalé vers la droite', function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 17, y: 30, largeur: 5, hauteur: 10 });
    expect(bac.contient(piece)).toBe(true);
  });

  it("sait si une pièce n'est pas posé dessus", function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 5, y: 5 });
    expect(bac.contient(piece)).toBe(false);
  });

  it("sait si une autre pièce n'est pas posé dessus", function () {
    const bac = new Bac({ x: 10, y: 20, largeur: 10, hauteur: 20 });
    const piece = new Piece({ x: 15, y: 45 });
    expect(bac.contient(piece)).toBe(false);
  });
});
