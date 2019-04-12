import { Bac, CHANGEMENT_ETAT_SURVOLE } from 'controle/modeles/bac';
import { PIECE_CONFORME } from 'controle/modeles/piece';

describe('un bac', function () {
  it('connaît ses dimensions', function () {
    const bac = new Bac({ largeur: 20, hauteur: 30 });
    expect(bac.dimensions()).to.eql({ largeur: 20, hauteur: 30 });
  });

  it('connaît sa position', function () {
    const bac = new Bac({ x: 5, y: 10 });
    expect(bac.position()).to.eql({ x: 5, y: 10 });
  });

  it('sait quel catégorie de pièces accueillir', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    expect(bac.categorie()).to.equal(PIECE_CONFORME);
  });

  it('peut être passé en état survolé', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    expect(bac.etatSurvole()).to.be(false);
    bac.passeEnEtatSurvole();
    expect(bac.etatSurvole()).to.be(true);
  });

  it("l'état survolé peut être réinitialisé", function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
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
});
