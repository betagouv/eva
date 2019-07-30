/* global Event */

import Contenant from 'inventaire/modeles/contenant';
import VueContenu from 'inventaire/vues/contenu';

describe('vue contenu', function () {
  let vue;
  let calque;
  let element;
  const DELAI_FERMETURE = 3;

  beforeEach(function () {
    document.body.innerHTML = '<div id="point-insertion"></div>';
    let pointInsertion = document.getElementById('point-insertion');
    vue = new VueContenu(pointInsertion, DELAI_FERMETURE);
    calque = document.getElementById('calque');
    element = vue.element;
  });

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    expect(calque.classList).to.contain('invisible');
    expect(element.classList).to.contain('invisible');
  });

  it("sait s'afficher puis se cacher", function (done) {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);

    expect(calque.classList).to.not.contain('invisible');
    expect(vue.element.classList).to.not.contain('invisible');

    calque.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(calque.classList).to.contain('invisible');
      expect(vue.element.classList).to.contain('invisible');
      done();
    }, DELAI_FERMETURE);
  });

  it("ajoute le calque après l'element pour qu'il soit devant", function () {
    expect(document.querySelector('.contenu + .calque')).to.not.be(null);
  });

  describe('position()', function () {
    it("calcule la position du contenant ouvert pour qu'il soit centré sur le contenant fermé", function () {
      expect(vue.position(50, 2, 4)).to.equal(49);
    });
  });

  describe('affiche()', function () {
    it("sait afficher l'image du contenant ouvert", function () {
      const contenant = new Contenant({ imageOuvert: 'image_contenant', dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky' });
      vue.affiche(contenant);

      expect(element.src).to.eql('http://localhost/image_contenant');
    });

    it('affiche le contenant ouvert aux dimensions données en paramètres', function () {
      const contenant = new Contenant({ dimensionsOuvert: { largeur: 30, hauteur: 20 } });

      vue.affiche(contenant);

      expect(vue.element.style.width).to.eql('30%');
      expect(vue.element.style.height).to.eql('20%');
    });
  });
});
