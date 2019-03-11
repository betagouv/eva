import uuidv4 from 'uuid/v4';

import { DepotJournal } from 'commun/infra/depot_journal.js';
import { Journal } from 'commun/modeles/journal.js';
import { VueJournal } from 'inventaire/vues/journal.js';
import { initialise as initialiseInternationalisation, traduit } from 'commun/infra/internationalisation';

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduit('restitution_inventaire.titre');
    jQuery('body').append(`
      <div id="restitution">
        <h1>${traduit('restitution_inventaire.titre')}</h1>
      </div>
    `);

    const journal = new Journal(Date.now, uuidv4(), new DepotJournal());
    const vue = new VueJournal('#restitution', journal);
    vue.affiche();
  });
});
