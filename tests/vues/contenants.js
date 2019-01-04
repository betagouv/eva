/* global Event */

import { VueContenants } from '../../src/vues/contenants.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenants', function () {
  let vue;
  let imageEtageres;
  let contenantsJournalises;

  const stock = [
    unContenantVrac('Nova Sky', 1).deCategorie('moyen').aLaPosition(40, 80),
    unContenantVrac('Nova Sky', 2).deCategorie('moyen').aLaPosition(60, 80)
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
    vue.afficheLesContenants(stock);

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);

    const contenants = document.getElementById('contenants');
    expect(contenants.style.width).to.equal('100px');
    expect(contenants.style.height).to.equal('50px');
    expect(contenants.childNodes[0]).to.equal(contenantsAjoutes[0]);
    expect(contenants.childNodes[1]).to.equal(contenantsAjoutes[1]);
  });

  it('affiche le contenu quand on clique sur un contenant', function () {
    let contenantAffiche;
    vue.afficheLesContenants(stock, { affiche: (contenant) => {
      contenantAffiche = contenant;
    } });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));

    expect(contenantAffiche).to.equal(stock[0]);
  });

  it('journalise le contenant quand on clique dessus', function () {
    vue.afficheLesContenants(stock, { affiche: () => {} });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));

    expect(contenantsJournalises).to.eql([stock[0]]);
  });
});
