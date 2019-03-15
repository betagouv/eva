import 'inventaire/styles/app.scss';
import 'inventaire/styles/etageres.scss';

import uuidv4 from 'uuid/v4';

import { contenants, contenus } from 'inventaire/data/stock.js';
import { DepotJournal } from 'inventaire/infra/depot_journal.js';
import { Journal } from 'inventaire/modeles/journal.js';
import { creeMagasin } from 'inventaire/modeles/magasin.js';
import { VueEtageres } from 'inventaire/vues/etageres.js';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaireSaisieInventaire.js';
import { VueConsigne } from 'commun/vues/consigne.js';
import { VueGo } from 'commun/vues/go.js';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';

import sonConsigneDemarrage from 'inventaire/assets/consigne_demarrage.mp3';

function afficheMagasin (pointInsertion, $) {
  const session = uuidv4();
  const magasin = creeMagasin({ contenants, contenus });
  const journal = new Journal(Date.now, session, new DepotJournal());
  new VueEtageres(pointInsertion, journal)
    .affiche(magasin.contenants());

  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $, function (resultatValidation, reponses) {
    const toutCorrect = Array.from(resultatValidation.values()).every(v => v);
    const message = toutCorrect ? 'Bravo, vous avez réussi !' : 'Ce n\'est pas tout à fait ça… réessayez.';

    journal.enregistreSaisieInventaire(toutCorrect, reponses);

    Array.from(resultatValidation).forEach((correction) => { afficheCorrection(correction, $); });
    window.alert(message);
  }, journal);
  new ActionsCommunesSituation(pointInsertion, $, journal).afficheElementEnCommun();
  const vueConsigne = new VueConsigne(pointInsertion, sonConsigneDemarrage);
  new VueGo(pointInsertion, vueConsigne, journal).afficher();
}

jQuery(function () {
  jQuery('body').append(`
    <div id="magasin" class="situation">
      <h1>Stock de boissons</h1>
    </div>
    `);

  afficheMagasin('#magasin', jQuery);
});
