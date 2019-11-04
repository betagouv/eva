/* global Event */

import Contenant from 'inventaire/modeles/contenant';
import VueContenu from 'inventaire/vues/contenu';
import { unMagasin } from '../aides/magasin';

describe('vue contenu', function () {
  let situation;
  let vue;
  const DELAI_FERMETURE = 3;

  beforeEach(function () {
    situation = unMagasin().construit();
    document.body.innerHTML = '<div id="point-insertion"></div>';
    const pointInsertion = document.getElementById('point-insertion');
    vue = new VueContenu(situation, pointInsertion, DELAI_FERMETURE);
  });

  it('initialise un calque invisible', function () {
    expect(vue.calque.classList).to.contain('invisible');
  });

  it("sait s'afficher puis se cacher", function (done) {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);

    expect(vue.calque.classList).to.not.contain('invisible');
    expect(vue.element.classList).to.not.contain('invisible');

    vue.calque.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(vue.calque.classList).to.contain('invisible');
      expect(vue.element.classList).to.contain('invisible');
      done();
    }, DELAI_FERMETURE);
  });

  it("ajoute le calque après l'element pour qu'il soit devant", function () {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);

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

      expect(vue.element.src).to.eql('http://localhost/image_contenant');
    });

    it('affiche le contenant ouvert aux dimensions données en paramètres', function () {
      const contenant = new Contenant({ dimensionsOuvert: { largeur: 30, hauteur: 20 } });

      vue.affiche(contenant);

      expect(vue.element.style.width).to.eql('30%');
      expect(vue.element.style.height).to.eql('20%');
    });

    it("affiche le contenu avec le type et la quantite lorsque l'aide est activée", function () {
      situation.activeAide();

      const contenant = new Contenant({ quantite: 5, dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky' });
      vue.affiche(contenant);
      expect(vue.element.classList.contains('contenu-aide')).to.be(true);
      expect(vue.element.textContent).to.eql('5 Nova Sky');
    });
  });
});
