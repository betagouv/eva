import Contenant from 'inventaire/modeles/contenant';
import VueContenant from 'inventaire/vues/contenant';

describe('vue contenant', function () {
  let vue;

  const contenant = new Contenant(
    { quantite: 12, posX: 40, posY: 80, largeur: 15, hauteur: 25, profondeurX: 10, profondeurY: 12, courbe: 12 }
  );

  beforeEach(function () {
    document.body.innerHTML = '<div id="contenants"></div>';
    const pointInsertion = document.getElementById('contenants');
    vue = new VueContenant(pointInsertion, contenant);
  });

  it('affiche un contenant en fonction du modèle', function () {
    vue.affiche();

    const contenant = document.getElementById('contenants').firstChild;
    expect(contenant.classList.value).toContain('contenant');
    expect(contenant.getAttribute('d'))
      .toEqual(`M   40   80
           v  -25
           l  10  -6
           c  3 -12  15 -12 15 0
           v  25
           l  -10  6
           c  -3 12 -15 12 -15 0
           Z`
      );
  });

  it("affiche le contenu d'un contenant quand on clique dessus", function (done) {
    vue.affiche(function () {
      done();
    });

    const contenant = document.getElementsByClassName('contenant')[0];
    contenant.dispatchEvent(new Event('click'));
  });
});
