/* global Event */

import Contenant from 'inventaire/modeles/contenant';
import VueContenu from 'inventaire/vues/contenu';
import { unMagasin } from '../aides/magasin';
import EvenementFermetureContenant from 'inventaire/modeles/evenement_fermeture_contenant';

describe('vue contenu', function () {
  let situation;
  let vue;
  let journal;
  let delaiFermeture;
  const DELAI_FERMETURE = 3;

  beforeEach(function () {
    situation = unMagasin().construit();
    document.body.innerHTML = '<div id="point-insertion"></div>';
    const pointInsertion = document.getElementById('point-insertion');
    journal = {
      enregistre () {}
    };
    vue = new VueContenu(situation, pointInsertion, journal, delaiFermeture = DELAI_FERMETURE);
  });

  it("sait s'afficher puis se cacher", function (done) {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);

    setTimeout(() => {
      expect(vue.element.classList).toContain('ouvrir');
      vue.calque.dispatchEvent(new Event('click'));

      vue.ferme(contenant);
      expect(vue.element.classList).toContain('fermer');

      setTimeout(() => {
        expect(vue).not.toContain('calque');
        done();
      }, delaiFermeture);
    }, 50);
  });

  it('envoi un événement à la fermeture du contenant', function (done) {
    const contenant = new Contenant({ id: 'id_contenant', idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementFermetureContenant);
      expect(evenement.donnees()).toEqual({ contenant: 'id_contenant' });
      done();
    };

    vue.affiche(contenant);
    vue.calque.dispatchEvent(new Event('click'));
  });

  it("ajoute le calque après l'element pour qu'il soit devant", function () {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);

    expect(document.querySelector('.contenu + .calque')).not.toBe(null);
  });

  describe('position()', function () {
    it("calcule la position du contenant ouvert pour qu'il soit centré sur le contenant fermé", function () {
      expect(vue.position(50, 2, 4)).toBe(49);
    });
  });

  describe('affiche()', function () {
    it("sait afficher l'image du contenant ouvert", function () {
      const contenant = new Contenant({ imageOuvert: 'image_contenant', dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky' });
      vue.affiche(contenant);

      expect(vue.element.src).toEqual('http://localhost/image_contenant');
    });

    it('affiche le contenant ouvert aux dimensions données en paramètres', function () {
      const contenant = new Contenant({ dimensionsOuvert: { largeur: 30, hauteur: 20 } });

      vue.affiche(contenant);

      expect(vue.element.style.width).toEqual('30%');
      expect(vue.element.style.height).toEqual('20%');
    });

    describe("avec l'aide activé", function () {
      beforeEach(function () {
        situation.activeAide();
      });

      it('affiche le contenu avec le type et la quantite', function () {
        const contenant = new Contenant({ quantite: 5, dimensionsOuvert: { largeur: 33, hauteur: 33 }, couleur: 'green' }, { nom: 'Nova Sky' });
        vue.affiche(contenant);
        expect(vue.element.classList.contains('contenu-aide')).toBe(true);
        expect(vue.element.style.backgroundColor).toEqual('green');
        expect(vue.element.textContent).toEqual('inventaire.aide_contenu{"nombre":5,"produit":"Nova Sky"}');
      });

      it("affiche l'unité si le contenant est un bidon", function () {
        const contenant = new Contenant({ quantite: 5, dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky', forme: 'bidon' });
        vue.affiche(contenant);
        expect(vue.element.classList.contains('contenu-aide')).toBe(true);
        expect(vue.element.textContent).toEqual('inventaire.aide_contenu_bidon{"nombre":5,"produit":"Nova Sky"}');
      });

      it("n'affiche rien lorsque la quantite est à 0", function () {
        const contenant = new Contenant({ quantite: 0, dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky' });
        vue.affiche(contenant);
        expect(vue.element.textContent).toEqual('');
      });
    });
  });
});
