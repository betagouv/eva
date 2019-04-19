/* global Event */

import Contenant from 'inventaire/modeles/contenant';
import VueEtageres from 'inventaire/vues/etageres';
import jsdom from 'jsdom-global';

describe('vue etagères', function () {
  let vue;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    depotRessources = { image () { return new window.Image(); } };
    vue = new VueEtageres('#magasin', {}, depotRessources);
  });

  it("sait s'afficher dans une page web", function () {
    depotRessources.image = (chemin) => {
      expect(chemin).to.equal('inventaire/etageres.png');
      const image = new window.Image();
      image.src = 'mon-image-etageres.png';
      return image;
    };

    const elementsTrouves = document.querySelectorAll('#magasin .etageres');
    expect(elementsTrouves.length).to.equal(1);

    vue.affiche([]);

    const etageres = document.getElementById('imageEtageres');
    expect(etageres.src).to.equal('mon-image-etageres.png');
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    const contenants = [
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 7 })
    ];
    vue.affiche(contenants);

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);
  });

  it("recalcule la taille de l'avant plan quand on redimensionne l'image", function () {
    vue.affiche([]);
    const imageEtageres = document.getElementById('imageEtageres');
    imageEtageres.width = 50;
    imageEtageres.height = 25;
    window.dispatchEvent(new Event('resize'));

    const avantPlan = document.querySelector('.avant-plan');
    expect(avantPlan.style.width).to.equal('50px');
    expect(avantPlan.style.height).to.equal('25px');
  });

  it("ajoute la vue contenu à l'interieur de l'avant plan pour que ses dimensions soient bien calculées par rapport à la taille de l'image", function () {
    vue.affiche([]);

    expect(document.querySelector('.avant-plan .contenu')).to.not.equal(null);
  });
});
