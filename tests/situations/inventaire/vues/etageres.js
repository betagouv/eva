import { Contenant } from 'inventaire/modeles/contenant.js';
import { VueEtageres } from 'inventaire/vues/etageres.js';
import jsdom from 'jsdom-global';

describe('vue etagères', function () {
  let vue;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    vue = new VueEtageres('#magasin');
  });

  it("sait s'afficher dans une page web", function () {
    let elementsTrouves = document.querySelectorAll('#magasin .etageres');
    expect(elementsTrouves.length).to.equal(1);

    vue.affiche([]);

    const etageres = document.getElementById('imageEtageres');
    expect(etageres.tagName).to.equal('IMG');
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
});
