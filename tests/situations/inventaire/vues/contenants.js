/* global Event */

import { Contenant } from 'inventaire/modeles/contenant.js';
import { VueContenants } from 'inventaire/vues/contenants.js';
import jsdom from 'jsdom-global';

describe('vue contenants', function () {
  let vue;
  let contenantsJournalises;
  let pointInsertion;

  let contenants = [
    new Contenant({ id: '0', idContenu: '0', quantite: 1, posX: 40, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' }),
    new Contenant({ id: '1', idContenu: '0', quantite: 2, posX: 60, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' })
  ];

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    pointInsertion = document.getElementById('stock');
    contenantsJournalises = [];
    let journal = {
      enregistreOuvertureContenant: (contenant) => {
        contenantsJournalises.push(contenant);
      }
    };
    vue = new VueContenants(pointInsertion, journal);
  });

  it("crée un point d'insertion pour tous les contenants", function () {
    expect(pointInsertion.querySelector('svg')).not.to.be(null);
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    vue.afficheLesContenants(contenants);

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);

    expect(vue.svg.childNodes[0]).to.equal(contenantsAjoutes[0]);
    expect(vue.svg.childNodes[1]).to.equal(contenantsAjoutes[1]);
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
    contenants[0].id = 'id_contenant';
    vue.afficheLesContenants(contenants, { affiche: () => {} });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));

    expect(contenantsJournalises).to.eql([{ contenant: 'id_contenant' }]);
  });
});
