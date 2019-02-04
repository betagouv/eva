import '../styles/app.scss';
import '../styles/etageres.scss';

import donneesStock from '../data/stock.json';

import { DepotJournal } from '../infra/depot_journal.js';
import { Journal } from '../modeles/journal.js';
import { creeMagasin } from '../modeles/magasin.js';
import { VueEtageres } from '../vues/etageres.js';
import { VueFicheReferences } from '../vues/fiche_references.js';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from '../vues/formulaireSaisieInventaire.js';

function afficheMagasin (pointInsertion, $) {
  let magasin = creeMagasin(donneesStock);
  const lignePrincipale = document.createElement('div');
  lignePrincipale.classList.add('ligne-principale');
  lignePrincipale.id = 'ligne-principale';
  document.querySelector(pointInsertion).appendChild(lignePrincipale);
  new VueEtageres('#ligne-principale', new Journal(Date.now, new DepotJournal()))
    .affiche(magasin.contenants());
  new VueFicheReferences('#ligne-principale').affiche();

  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $, function (resultatValidation) {
    let toutCorrect = Array.from(resultatValidation.values()).every(v => v);
    let message = toutCorrect ? 'Bravo, vous avez réussi !' : 'Ce n\'est pas tout à fait ça… réessayez.';

    Array.from(resultatValidation).forEach((correction) => { afficheCorrection(correction, $); });
    window.alert(message);
  });
}

jQuery(function () {
  jQuery('body').append(`
    <div id="magasin">
      <h1>Stock de boissons</h1>
    </div>
    `);

  afficheMagasin('#magasin', jQuery);
});
