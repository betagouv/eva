import Contenant from 'inventaire/modeles/contenant';
import VueContenants from 'inventaire/vues/contenants';
import EvenementOuvertureContenant from 'inventaire/modeles/evenement_ouverture_contenant';

describe('vue contenants', function () {
  let vue;
  let pointInsertion;
  let journal;

  const contenants = [
    new Contenant({ id: '0', idContenu: '0', quantite: 1, posX: 40, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' }),
    new Contenant({ id: '1', idContenu: '0', quantite: 2, posX: 60, posY: 80 }, { nom: 'Nova Sky', image: 'chemin' })
  ];

  beforeEach(function () {
    document.body.innerHTML = '<div id="stock"></div>';
    pointInsertion = document.getElementById('stock');
    journal = {
      enregistre () {}
    };
    vue = new VueContenants(pointInsertion, journal);
  });

  it("crée un point d'insertion pour tous les contenants", function () {
    expect(pointInsertion.querySelector('svg')).not.toBe(null);
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    vue.afficheLesContenants(contenants);

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).toBe(2);

    expect(vue.svg.childNodes[0]).toBe(contenantsAjoutes[0]);
    expect(vue.svg.childNodes[1]).toBe(contenantsAjoutes[1]);
  });

  it('affiche le contenu quand on clique sur un contenant', function (done) {
    vue.afficheLesContenants(contenants, {
      affiche: (contenant) => {
        expect(contenant).toBe(contenants[0]);
        done();
      }
    });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));
  });

  it('journalise le contenant quand on clique dessus', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementOuvertureContenant);
      expect(evenement.donnees()).toEqual({ contenant: 'id_contenant' });
      done();
    };
    contenants[0].id = 'id_contenant';
    vue.afficheLesContenants(contenants, { affiche: () => {} });

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));
  });
});
