import 'inventaire/styles/app.scss';
import 'inventaire/styles/etageres.scss';

import { contenants, contenus } from 'inventaire/data/stock.js';
import { DepotJournal } from 'inventaire/infra/depot_journal.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { creeMagasin } from 'inventaire/modeles/magasin.js';
import { VueEtageres } from 'inventaire/vues/etageres.js';
import { VueFicheReferences } from 'inventaire/vues/fiche_references.js';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire.js';
import { initialiseFormulaireCommencer } from 'inventaire/vues/bouttonCommencer.js';

function afficheMagasin(pointInsertion, $) {
  let magasin = creeMagasin({ contenants, contenus });
  const lignePrincipale = document.createElement('div');
  lignePrincipale.classList.add('ligne-principale');
  lignePrincipale.id = 'ligne-principale';
  document.querySelector(pointInsertion).appendChild(lignePrincipale);
  new VueEtageres('#ligne-principale', new Journal(Date.now, new DepotJournal())).affiche(magasin.contenants());
  new VueFicheReferences('#ligne-principale').affiche();

  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $, function (resultatValidation) {
    let toutCorrect = Array.from(resultatValidation.values()).every(v => v);
    let message = toutCorrect ? 'Bravo, vous avez réussi !' : 'Ce n\'est pas tout à fait ça… réessayez.';

    Array.from(resultatValidation).forEach((correction) => { afficheCorrection(correction, $); });
    window.alert(message);
  });
}

function Commencer() {
  initialiseFormulaireCommencer('#magasin', jQuery, () => {
    afficheMagasin('#magasin', jQuery)
  });
}

jQuery(function () {
  jQuery('body').append(`
    <div id="magasin">
      <h1>Stock de boissons</h1>
    </div>
    `);
  Commencer();
});
