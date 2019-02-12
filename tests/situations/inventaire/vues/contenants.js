/* global Event */

import { Contenant } from 'inventaire/modeles/contenant.js';
import { VueContenants } from 'inventaire/vues/contenants.js';
import jsdom from 'jsdom-global';

describe('vue contenants', function () {
  let vue;
  let imageEtageres;
  let contenantsJournalises;

  let contenants = [
    new Contenant({ idContenu: '0', quantite: 1, posX: 40, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' }),
    new Contenant({ idContenu: '0', quantite: 2, posX: 60, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' })
  ];

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    const pointInsertion = document.getElementById('stock');
    imageEtageres = { width: 100, height: 50 };
    contenantsJournalises = [];
    let journal = {
      enregistreOuvertureContenant: (contenant) => {
        contenantsJournalises.push(contenant);
      }
    };
    vue = new VueContenants(pointInsertion, imageEtageres, journal);
  });

  it("crée un point d'insertion pour tous les contenants", function () {
    const element = document.getElementById('contenants');

    expect(element.classList).to.contain('contenants');
  });

  it("recalcule la taille de contenants quand on redimensionne l'image", function () {
    imageEtageres.width = 50;
    imageEtageres.height = 25;
    window.dispatchEvent(new Event('resize'));

    const element = document.getElementById('contenants');
    expect(element.style.width).to.equal('50px');
    expect(element.style.height).to.equal('25px');
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    vue.afficheLesContenants(contenants);

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);

    const elementContenants = document.getElementById('contenants');
    expect(elementContenants.childNodes[0]).to.equal(contenantsAjoutes[0]);
    expect(elementContenants.childNodes[1]).to.equal(contenantsAjoutes[1]);
  });

  it('affiche le contenu quand on clique sur un contenant', function (done) {
    vue.afficheLesContenants(contenants, { affiche: (contenant) => {
      expect(contenant).to.equal(contenants[0]);
      done();
    } });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));
  });

  it('journalise le contenant quand on clique dessus', function () {
    vue.afficheLesContenants(contenants, { affiche: () => {} });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));

    expect(contenantsJournalises).to.eql([contenants[0]]);
  });
});
