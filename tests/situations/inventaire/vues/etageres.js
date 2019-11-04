/* global Event */

import VueEtageres from 'inventaire/vues/etageres';
import { unMagasin } from '../aides/magasin';

describe('vue etagères', function () {
  let vue;

  beforeEach(function () {
    document.body.innerHTML = '<div id="magasin"></div>';
    vue = new VueEtageres(unMagasin().construit());
  });

  it("sait s'afficher dans une page web", function () {
    vue.affiche('#magasin');

    const elementsTrouves = document.querySelectorAll('#magasin .etageres');
    expect(elementsTrouves.length).to.equal(1);

    const etageres = document.getElementById('imageEtageres');
    expect(etageres.tagName).to.equal('IMG');
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    const contenants = [
      { idContenu: '0', quantite: 12 },
      { idContenu: '1', quantite: 7 }
    ];
    const situation = unMagasin()
      .avecCommeReferences(
        { idProduit: '0', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille', position: 2 },
        { idProduit: '1', nom: 'Nova Sky', image: 'chemin image Nova Sky', forme: 'petiteBouteille', position: 2 }
      )
      .avecEnStock(...contenants)
      .construit();
    vue = new VueEtageres(situation);
    vue.affiche('#magasin');

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);
  });

  it("recalcule la taille de l'avant plan quand on redimensionne l'image", function () {
    vue.affiche('#magasin');
    const imageEtageres = document.getElementById('imageEtageres');
    imageEtageres.width = 50;
    imageEtageres.height = 25;
    window.dispatchEvent(new Event('resize'));

    const avantPlan = document.querySelector('.avant-plan');
    expect(avantPlan.style.width).to.equal('50px');
    expect(avantPlan.style.height).to.equal('25px');
  });
});
